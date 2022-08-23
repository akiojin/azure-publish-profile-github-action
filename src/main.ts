import * as core from '@actions/core'
import * as exec from '@actions/exec'
import { ArgumentBuilder } from '@akiojin/argument-builder'

async function Login(appID: string, password: string, tenant: string): Promise<void>
{
    const builder = new ArgumentBuilder()
        .Append('login')
        .Append('-u', appID)
        .Append('-p', password)
        .Append('--tenant', tenant)
    
    await exec.exec('az', builder.Build())
}

async function GetPublishProfile(appName: string, resourceGroup: string, subscription: string): Promise<string>
{
    const builder = new ArgumentBuilder()
        .Append('webapp')
        .Append('deployment')
        .Append('list-publishing-profiles')
        .Append('--name', appName)
        .Append('--resource-group', resourceGroup)
        .Append('--subscription', subscription)
        .Append('--xml')
    
    let output: string = ''
    const options: exec.ExecOptions = {
        listeners: {
            stdout: (data: Buffer) => {
                output += data.toString()
            }
        }
    }

    await exec.exec('az', builder.Build(), options)

    return output;
}

async function Run()
{
    try {
        await Login(core.getInput('app-id'), core.getInput('password'), core.getInput('tenant'))

        const publishProfile = GetPublishProfile(core.getInput('app-name'), core.getInput('resource-group'), core.getInput('subscription'))
        core.setOutput('publish-profile', publishProfile)
    } catch (ex: any) {
        core.setFailed(ex.message)
    }
}

Run()
