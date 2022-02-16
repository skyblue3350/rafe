import * as React from 'react'
import { Input, Button, Card, Menu, Label, Header, Container, Icon, Modal, Checkbox, Form, Dropdown, Item } from 'semantic-ui-react'
import { ProfileModal } from '../components/modal/profile'
import { SteamModal } from '../components/modal/stream'
import styled from 'styled-components'
import { useMount, useUpdateEffect } from 'ahooks'

const Main = styled.div`
width: 600px;
height: 500px;
`
const ToolBox = styled.div`
height: 50px;
display: flex;
align-items: center;
flex-direction: row;
`
const SearchBox = styled.div`
flex: 1;
padding: 10px;
`
const OptionsBox = styled.div`
width: 150px;
justify-content: center;
display: flex;
`
const StreamBox = styled.div`
width: 600px;
height: 450px;
display: flex;
`
const StreamList = styled.div`
width: 250px;
overflow: hidden auto;
`
const StreamViewer = styled.div`
width: 450px;
overflow: hidden auto;
`

interface Props { }

export const App: React.FC<Props> = (props: Props) => {
    const [activeItem, setActiveItem] = React.useState('')
    const [profiles, setProfiles] = React.useState<Profile[]>([])
    const [profileModal, setProfileModal] = React.useState(false)
    const [streams, setStreams] = React.useState<Stream[]>([])
    const [streamModal, setStreamModal] = React.useState(false)

    useMount(() => {
        chrome.storage.local.get(['profiles', 'streams']).then(({profiles=[], streams=[]}) => {
            setProfiles(profiles)
            setStreams(streams)
        })
    })

    useUpdateEffect(() => {
        chrome.storage.local.set({
            profiles,
            streams,
        })
    }, [profiles, streams])

    return (
        <Main>
            <ProfileModal
                profiles={profiles}
                open={profileModal}
                onClose={() => setProfileModal(false)}
                onSubmit={(profile) => {
                    setProfiles([...profiles, profile])
                    setProfileModal(false)
                }} />
            <SteamModal
                profiles={profiles}
                open={streamModal}
                onClose={() => setStreamModal(false)}
                onSubmit={(stream) => {
                    setStreams([...streams, stream])
                    setStreamModal(false)
                }} />
            <ToolBox>
                <SearchBox>
                    <Input size='mini' fluid iconPosition='left' icon='search' placeholder='Search...' />
                </SearchBox>
                <OptionsBox>
                    <Dropdown as={Button} primary button text='Add'>
                        <Dropdown.Menu>
                            <Dropdown.Item text='Add Profile' icon='user plus' onMouseDown={() => setProfileModal(true)} />
                            <Dropdown.Item disabled={profiles.length === 0} text='Add Stream' icon='github' onMouseDown={() => setStreamModal(true)} />
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button icon='cog' />
                </OptionsBox>
            </ToolBox>
            <StreamBox>
                <StreamList>
                    <Menu vertical borderless>
                        <Menu.Item>
                            <Menu.Header>Stream</Menu.Header>
                            <Menu.Menu>
                                {streams.map((stream, index) => {
                                    return (
                                        <Menu.Item active={activeItem === stream.name} name={stream.name} onClick={(e, { name }) => setActiveItem(name)} key={index}>
                                            <Label color='teal'>{index}</Label>
                                            <Icon name='github' color={stream.color} />
                                            {stream.name}
                                        </Menu.Item>
                                    )
                                })}
                            </Menu.Menu>
                        </Menu.Item>
                    </Menu>
                </StreamList>
                <StreamViewer>
                    {Array.from(new Array(60)).map((v, i) => i + 1).map((item, index) => {
                        return <Card meta='today' fluid key={index} style={{ margin: 0 }}>
                            <Card.Content>
                                <Card.Header><Icon name='code branch' color='green' />hoge</Card.Header>
                                <Card.Meta>
                                    <Label tag size='mini' color='red'>bug</Label>
                                    <Label tag size='mini' color='purple'>good first issue</Label>
                                    <Label tag size='mini' color='red'>bug</Label>
                                    <Label tag size='mini' color='purple'>good first issue</Label>
                                    <Label tag size='mini' color='red'>bug</Label>
                                    <Label tag size='mini' color='purple'>good first issue</Label>
                                </Card.Meta>
                                <Card.Description>

                                </Card.Description>
                                <Card.Content extra textAlign='right'>{index} seconds ago</Card.Content>
                            </Card.Content>
                        </Card>
                    })}
                </StreamViewer>
            </StreamBox>
        </Main>
    )
}
