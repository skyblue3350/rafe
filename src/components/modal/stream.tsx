import * as React from 'react'
import { Modal, Form, Button, Message } from 'semantic-ui-react'

interface Props {
    open: boolean
    profiles: Profile[]
    onSubmit: (stream: Stream) => void
    onClose: () => void
}

export const SteamModal: React.FC<Props> = (props: Props) => {
    const [error, setError] = React.useState('')
    const [streamName, setStreamName] = React.useState('')
    const [profile, setProfile] = React.useState('')
    const [query, setQuery] = React.useState('')
    const [color, setColor] = React.useState('')
    const [notification, setNotification] = React.useState(false)

    const validate = (fn: () => void) => {
        fn()
    }

    return (
        <Modal open={props.open} onClose={props.onClose} dimmer='blurring'>
            <Modal.Content scrolling>
                <Modal.Description>
                    <Form error={error !== ''}>
                        <Form.Field required>
                            <label>Profile</label>
                            <Form.Select
                                value={profile}
                                onChange={(e, data) => setProfile(data.value.toString())}
                                placeholder='select profile'
                                options={props.profiles.map(profile => ({key: profile.name, text: profile.name, value: profile.name}))} />
                        </Form.Field>
                        <Form.Field required>
                            <label>Name</label>
                            <Form.Input
                                value={streamName}
                                onChange={(e, data) => setStreamName(data.value)}
                                placeholder='display name' />
                        </Form.Field>
                        <Form.Field required>
                            <label>Query</label>
                            <Form.Input
                                value={query}
                                onChange={(e, data) => setQuery(data.value)}
                                placeholder='query' />
                        </Form.Field>
                        <Form.Field>
                            <label>Color</label>
                            <Form.Input
                                value={color}
                                onChange={(e, data) => setColor(data.value)}
                                placeholder='#aabbcc' />
                        </Form.Field>
                        <Form.Field required>
                            <Form.Checkbox
                                checked={notification}
                                onChange={(e, data) => setNotification(data.checked)}
                                label='Notification' />
                        </Form.Field>
                        <Message error header='Error' content={error} />
                    </Form>
                </Modal.Description>                
            </Modal.Content>
            <Modal.Actions>
                <Button secondary content='Cancel' onClick={props.onClose} />
                <Button primary content='OK' onClick={() => validate(props.onClose)} />
            </Modal.Actions>
        </Modal>
    )
}
