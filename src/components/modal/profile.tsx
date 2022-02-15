import { Octokit } from "@octokit/rest"
import * as React from "react"
import { Modal, Form, Button, Input, Dropdown, Message } from "semantic-ui-react"

interface Props {
    open: boolean
    profiles: Profile[]
    onSubmit: (profile: Profile) => void
    onClose: () => void
}

export const ProfileModal: React.FC<Props> = (props: Props) => {
    const methods = ['https://', 'http://']
    const [error, setError] = React.useState('')
    const [profileName, setProfileName] = React.useState('')
    const [host, setHost] = React.useState('github.com')
    const [accessToken, setAccessToken] = React.useState('')
    const [method, setMethod] = React.useState(methods[0])
    const [disabled, setDisabled] = React.useState(false)

    const resetState = () => {
        setError('')
        setProfileName('')
        setHost('github.com')
        setAccessToken('')
        setMethod(methods[0])
        setDisabled(false)
    }

    const existProfile = () => {
        return props.profiles.some(p => p.name === profileName)
    }

    const existToken = () => {
        return props.profiles.some(p => p.accessToken === accessToken)
    }

    const validate = (fn: (profile: Profile) => void) => {
        setDisabled(true)
        if (profileName.length === 0) {
            setError('profile name is empty')
            setDisabled(false)
            return
        } else if (existProfile()) {
            setError(`profile(${profileName}) already exists`)
            setDisabled(false)
            return
        } else if (existToken()) {
            setError('this token is already in use')
            setDisabled(false)
            return
        }

        const client = new Octokit({
            auth: accessToken,
        })

        client.rest.users.getAuthenticated().then(res => {
            const profile: Profile = {
                name: profileName,
                method: method,
                host,
                accessToken,
            }
            resetState()
            fn(profile)
        }).catch(err => {
            setError('Authentication error')
            setDisabled(false)
        })
    }

    return (
        <Modal open={props.open} onClose={props.onClose} dimmer='blurring'>
            <Modal.Content scrolling>
                <Modal.Description>
                    <Form error={error !== ''}>
                        <Form.Field required>
                            <label>Profile Name</label>
                            <Form.Input
                                value={profileName}
                                onChange={(e, { value }) => setProfileName(value)}
                                placeholder='display profile name' />
                        </Form.Field>
                        <Form.Field required>
                            <label>Host</label>
                            <Input value={host} onChange={(e, { value }) => setHost(value)} placeholder='example.github.com' label={<Dropdown onChange={(e, { value }) => setMethod(value.toString())} defaultValue={method} options={methods.map(item => ({ key: item, text: item, value: item }))} />} labelPosition='left' />
                        </Form.Field>
                        <Form.Field required>
                            <label>Access Token</label>
                            <Form.Input  value={accessToken} onChange={(e, { value }) => setAccessToken(value)} placeholder='token' />
                        </Form.Field>
                        <Message error header='Error' content={error} />
                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button secondary content='Cancel' onClick={props.onClose} />
                <Button primary content='OK' onClick={() => validate(props.onSubmit)} disabled={disabled} />
            </Modal.Actions>
        </Modal>
    )
}
