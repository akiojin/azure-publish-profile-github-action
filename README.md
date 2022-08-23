# azure-publish-profile-github-action

![Build](https://github.com/akiojin/azure-publish-profile-github-action/actions/workflows/Build.yml/badge.svg)

This action retrieves the publish profile used for publishing in Azure WebApp and Azure Functions.

## Requirement

You will need to install [azure cli](https://docs.microsoft.com/en-us/cli/azure/)

## Installation

[How to install the Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)

```sh
brew update && brew install azure-cli
```

## Creating Service Principals

This action uses a service principal, so it must be created in advance.
To create a service principal with authority over subscriptions, do the following

```sh
az ad sp create-for-rbac --name <Service principal name> --role contributor --scopes /subscriptions/<Subscription ID>
```

In this case, the "contributor" privilege is inherited by all resources in the subscription.

```json
{
  "appId": "<App ID>",
  "displayName": "<Name>",
  "password": "<Password>",
  "tenant": "<Tenant ID>"
}
```

You will get a response like the above, save the `appId`, `password`, and `tenant` in this response.
Set each saved value to secrets in GitHub Actions.
Example: SERVICE_PRINCIPAL_APP_ID/SERVICE_PRINCIPAL_PASSWORD/SERVICE_PRINCIPAL_TENANT_ID

## Usage

```yml
- uses: akiojin/azure-publish-profile-github-action@v3
  id: publish-profile
  with:
    app-id: ${{ secrets.SERVICE_PRINCIPAL_APP_ID }}
    password: ${{ secrets.SERVICE_PRINCIPAL_PASSWORD }}
    tenant: ${{ secrets.SERVICE_PRINCIPAL_TENANT_ID }}
    subscription: "Azure subscription 1"
    app-name: <AppName>
    resource-group: <Resource Group>
```

### Arguments

|Name|Required|Type|Description|
|:--|:--|:--|:--|
|app-id|`true`|`string`|Service Principal App ID.|
|password|`true`|`string`|Service Principal Password.|
|tenant|`true`|`string`|Service Principal Tenant ID.|
|subscription|`true`|`string`|Subscription ID.|
|app-name|`true`|`string`|Name of the WebApp or Azure Functions from which to obtain the publishing profile.|
|resource-group|`true`|`string`|Resource group ID|

### Outputs

|Name|Type|Description|
|:--|:--|:--|
|publish-profile||`string`|Publishing profile|

## License

Any contributions made under this project will be governed by the [MIT License](https://github.com/akiojin/azure-publish-profile-github-action/blob/main/LICENSE).
