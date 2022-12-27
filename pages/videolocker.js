import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useUser } from '../lib/hooks'
import { Container, Button, Form } from '../components'

export default function Home() {
  const router = useRouter()
  const { user, mutateUser } = useUser()

  async function handleSubmit(e) {
    e.preventDefault()
    // Share the page on the user's social media account
    await mutateUser((user) => ({
      ...user,
      shared: true,
    }))
    // Unlock the video
    router.push('/video')
  }

  return (
    <Container>
      <Head>
        <title>Viral Landing Page</title>
      </Head>

      <h1>Welcome to Our Viral Landing Page</h1>

      {/* Embed the YouTube video and overlay a transparent layer with a locked video message and a Facebook share button */}
      <div style={{ position: 'relative' }}>
        <iframe
          src="https://www.youtube.com/embed/hT3bPw-VafU"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
        {user && !user.shared && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(255, 255, 255, 0.8)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p style={{ textAlign: 'center' }}>
              To unlock the video, share this page on your Facebook account:
            </p>
            <Form onSubmit={handleSubmit}>
              <Button type="submit">Share on Facebook</Button>
            </Form>
          </div>
        )}
      </div>
    </Container>
  )
}
