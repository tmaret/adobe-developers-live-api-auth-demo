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

const fs = require('fs')
const yargs = require('yargs')
const exchange = require('@adobe/aemcs-api-client-lib')

const FormData = require('form-data')
const fetch = require('node-fetch')

const NodeCache = require( "node-cache" )
const cache = new NodeCache()

const argv = yargs(process.argv.slice(2))
    .option('aem', {
        description: 'AEM Author URL',
        type: 'string',
        default: 'https://author-p19554-e28364-cmstg.adobeaemcloud.com'
    })
    .option('path', {
        description: 'Path of the asset to be updated',
        type: 'string',
        default: '/content/dam/wknd/en/adventures/bali-surf-camp/AdobeStock_175749320.jpg'
    })
    .option('file', {
        description: 'File containing Service Credentials obtained via the Developer Console',
        type: 'string',
        default: 'service_token_cm-p19554-e28364.json'
    })
    .help().alias('help', 'h')
    .argv;

var config = JSON.parse(fs.readFileSync(argv.file, 'utf8'))

/*
 * Run the workflow every 30 seconds
 */
setInterval(function wf(){
    updateOnTime()
    return wf
}() , 30 * 1000);

/*
 * Update `onTime` property using the Apache Sling Post Servlet
 *
 * https://sling.apache.org/documentation/bundles/manipulating-content-the-slingpostservlet-servlets-post.html
 */
async function updateOnTime() {
    getAccessToken().then(token => {
        const form = new FormData()
        const onTime = new Date().toISOString()
        form.append('onTime', onTime)
        fetch(`${argv.aem}${argv.path}/jcr:content`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: form
        }).then(res => {
            if (res.status === 200) {
                console.log(`Updated onTime with '${onTime}' for ${argv.path}`)
            } else {
                console.error(`Failed to update onTime ${res.status} ${res.statusText}`)
            }
        });
    })
}

/*
 * Get an access token from the `Local Development Token` config
 * or by performing an exchange using the `Service Credentials` config
 */
async function getAccessToken() {
    return config.accessToken || exchangeAccessToken()
}

/*
 * Get an access token via the JWT exchange flow.
 *
 * The access token is reused until it has expired.
 */
async function exchangeAccessToken() {
    const token = cache.get('token')
    return (undefined !== token) ? token : exchange(config).then(res => {
        // cache the access token with a ttl that account for a 5% leeway
        const ttl = Math.round(res.expires_in / 1000 * 0.95)
        cache.set('token', res.access_token, ttl)
        return res.access_token
    }).catch(e => {
        console.log("Failed to exchange for access token ", e)
        throw e;
    });
}
