# OAuth 2.0 server to server authentication to ​AEM as a Cloud Service​

This demo leverages the [AEM-CS API Client Library](https://github.com/adobe/aemcs-api-client-lib) to
authenticate a server to an [AEM as a Cloud Service](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/overview/introduction.html) environment.

TBD - pitch

## Requirements

* Access to an AEM as a Cloud Service environment

# Setup

## Install the server

```
npm install
```

## Start the server

```
node index.js
```

## Help

```
node index.js -h
Options:
      --version                Show version number                     [boolean]
      --aem, --aem_author_url  AEM Author URL
      [string] [default: "https://author-p19554-e28364-cmstg.adobeaemcloud.com"]
      --file, --cred_file      File containing Service Credentials obtained via
                               the Developer Console
                       [string] [default: "service_token_cm-p19554-e28363.json"]
  -h, --help                   Show help                               [boolean]
```

# Links

* [AEM-CS API Client Library](https://github.com/adobe/aemcs-api-client-lib)
* [Generating Access Tokens for Server Side APIs](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/implementing/developing/generating-access-tokens-for-server-side-apis.html?lang=en#the-server-to-server-flow)
* [Token based authentication to AEM as a Cloud Service](https://experienceleague.adobe.com/docs/experience-manager-learn/getting-started-with-aem-headless/authentication/overview.html?lang=en#authentication)