import React from 'react'
import Notes from './Notes'

export default function Home() {
    const token = sessionStorage.getItem('token');
    return (
        <>
        <Notes/>
        </>
    )
}
