interface Profile {
    name: string
    accessToken: string
    method: string
    host: string
}

interface Stream {
    name: string
    query: string
    color: import('semantic-ui-react').SemanticCOLORS
    notification: boolean
}
