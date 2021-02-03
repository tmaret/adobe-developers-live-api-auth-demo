/*jshint node:true */
"use strict";

/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const fs = require('fs');
const yargs = require('yargs')
const exchange = require('@adobe/aemcs-api-client-lib');
const fetch = require('node-fetch');
const express = require('express')
const app = express()

const port = 3000

const argv = yargs(process.argv.slice(2))
    .option('aem', {
        alias: 'aem_author_url',
        description: 'AEM Author URL',
        type: 'string',
        default: 'https://author-p19554-e28364-cmstg.adobeaemcloud.com'
    })
    .option('file', {
        alias: 'cred_file',
        description: 'File containing Service Credentials obtained via the Developer Console',
        type: 'string',
        default: 'service_token_cm-p19554-e28364.json'
    })
    .help().alias('help', 'h')
    .argv;

var config = JSON.parse(fs.readFileSync(argv.cred_file, 'utf8'));


app.get('/*', function (req, res) {

    exchange(config).then(jwtAuthRes => {

        return fetch(`${argv.aem}${req.url}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtAuthRes.access_token}`
            }
        }).then(damRes => {
            console.log(`<< ${damRes.status} ${damRes.statusText}`)
            return damRes.json()
        }).then(json => {
            res.send(json)
        });

    }).catch(e => {
        console.log("Failed to exchange for access token ",e);
    });

})

console.log(`Starting server on port '${port}' interacting with AEM author '${argv.aem}' using the credentials from the file '${argv.file}'`)
app.listen(port)
