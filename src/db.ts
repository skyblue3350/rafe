import Dexie, { Table } from 'dexie'

interface Label {
    id: string
    node_id: string
    name: string
    color: string
    default: boolean
    description: string
}

interface User {
    login: string
    avatar_url: string
    html_url: string
}

export interface StreamTable {
    stream: string
    title: string
    labels: Label[]
    state: string
    html_url: string
    assignee: User
    assignees: User[]
    created_at: string
    updated_at: string
}

export class StreamClassedDexie extends Dexie {
    streams!: Table<StreamTable>

    constructor() {
        super('Streams')
        this.version(1).stores({
            streams: '++,stream,title'
        })
    }
}

export const db = new StreamClassedDexie()
