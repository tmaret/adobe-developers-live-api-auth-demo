# OAuth 2.0 server to server authentication to ​AEM as a Cloud Service​

This demo leverages server to server authentication to allow a Node.js app to authenticate and update content maintained in an [AEM as a Cloud Service](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/overview/introduction.html) environment. The app simulates a workflow engine that periodically schedules the `On Time` activation date of an asset. The app leverages the [AEM-CS API Client Library](https://github.com/adobe/aemcs-api-client-lib).

## Requirements

* Access to an environment in AEM as a Cloud Service with the [WKND](https://experienceleague.adobe.com/docs/experience-manager-learn/getting-started-wknd-tutorial-develop/overview.html) demo content

* Service Credentials or Local Development Token as described in [Generating Access Tokens for Server Side APIs](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/implementing/developing/generating-access-tokens-for-server-side-apis.html?lang=en#the-server-to-server-flow)

* Technical Account added in the `content-authors` group via the AEM Security Admin UI.

## Install the workflow app

```
npm install
```

## Start the workflow app

```
node workflow.js --aem https://author-p19554-e28364-cmstg.adobeaemcloud.com \
                 --path /content/dam/wknd/en/adventures/bali-surf-camp/AdobeStock_175749320.jpg \
                 --file service_token_cm-p19554-e28364.json
```

## Help

```
node workflow.js -h
```

## Links

* [AEM-CS API Client Library](https://github.com/adobe/aemcs-api-client-lib)
* [Generating Access Tokens for Server Side APIs](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/implementing/developing/generating-access-tokens-for-server-side-apis.html?lang=en#the-server-to-server-flow)
* [Token based authentication to AEM as a Cloud Service](https://experienceleague.adobe.com/docs/experience-manager-learn/getting-started-with-aem-headless/authentication/overview.html?lang=en#authentication)
