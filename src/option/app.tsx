import * as React from 'react';
import { Input, Button, Grid, Menu, Label, Header, Container } from 'semantic-ui-react'

export interface Props {
}

export interface State {
    activeItem
}

export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = { activeItem: 'inbox' }
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render(): JSX.Element {
        return (

                    
                        
            <Menu vertical>
            <Menu.Item
              onClick={null}
            >
              <Label color='teal'>1</Label>
              Inbox
            </Menu.Item>
    
            <Menu.Item
              name='spam'
              active={this.state.activeItem === 'spam'}
              onClick={this.handleItemClick}
            >
              <Label>51</Label>
              Spam
            </Menu.Item>
    
            <Menu.Item
              name='updates'
              active={this.state.activeItem === 'updates'}
              onClick={this.handleItemClick}
            >
              <Label>1</Label>
              Updates
            </Menu.Item>
            <Menu.Item>
              <Input icon='search' placeholder='Search mail...' />
            </Menu.Item>
          </Menu>

        )
    }
}
