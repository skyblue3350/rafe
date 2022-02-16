import * as React from 'react'
import { Modal, Form, Button, Message, SemanticCOLORS } from 'semantic-ui-react'

interface Props {
    open: boolean
    profiles: Profile[]
    onSubmit: (stream: Stream) => void
    onClose: () => void
}

export const SteamModal: React.FC<Props> = (props: Props) => {
    const colors = [
        'black',
        'red',
        'orange',
        'yellow',
        'olive',
        'green',
        'teal',
        'blue',
        'violet',
        'purple',
        'pink',
        'brown',
        'grey',
    ]
    const [error, setError] = React.useState('')
    const [streamName, setStreamName] = React.useState('')
    const [profile, setProfile] = React.useState('')
    const [query, setQuery] = React.useState('')
    const [color, setColor] = React.useState<SemanticCOLORS>('black')
    const [notification, setNotification] = React.useState(false)

    const resetState = () => {
        setError('')
        setStreamName('')
        setProfile('')
        setQuery('')
        setColor('black')
    }

    const validate = (fn: (stream: Stream) => void) => {
        // TODO: validate
        const stream: Stream = {
            name: streamName,
            query,
            color,
            notification,
        }
        resetState()
        fn(stream)
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
                                options={props.profiles.map(profile => ({
                                    key: profile.name,
                                    text: `${profile.name} ( ${profile.method}${profile.host} )`,
                                    value: profile.name
                                }))} />
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
                            <Form.Select
                                value={color}
                                onChange={(e, {value}) => setColor(value as SemanticCOLORS)}
                                options={colors.map(color => ({
                                    key: color,
                                    text: color,
                                    value: color,
                                }))} />
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
                <Button primary content='OK' onClick={() => validate(props.onSubmit)} />
            </Modal.Actions>
        </Modal>
    )
}
