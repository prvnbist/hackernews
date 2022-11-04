import React from 'react'
import { useOutletContext } from '@remix-run/react'
import { Heading, TextInputField, Pane, Label, Textarea, Button } from 'evergreen-ui'

import type { ContextType } from '../root'

interface IFormState {
   name?: string
   bio?: string
   username?: string
}

export default function Profile() {
   const [status, setStatus] = React.useState<'IDLE' | 'SAVING'>('IDLE')
   const { user, supabase } = useOutletContext<ContextType>()
   const [form, setForm] = React.useState<IFormState>({
      name: '',
      bio: '',
      username: '',
   })

   React.useEffect(() => {
      if (user) {
         setForm(_form => ({
            ..._form,
            bio: user?.bio || _form.bio,
            name: user?.name || _form.name,
            username: user?.username || _form.username,
         }))
      }
   }, [user])

   React.useEffect(() => {
      // handle username checking
   }, [form.username])

   const onSubmit = async () => {
      try {
         setStatus('SAVING')
         await supabase.from('account').update(form).eq('user_id', user?.user_id)
         setStatus('IDLE')
      } catch (error) {
         console.log(error)
         setStatus('IDLE')
      }
   }

   const onChange = e => {
      const { name, value } = e.target
      setForm(_form => ({
         ..._form,
         [name]: value,
      }))
   }

   const hasFormChanged = user?.name !== form.name || user?.username !== form.username || user?.bio !== form.bio

   return (
      <div id="profile__container">
         <Heading size={600} marginTop={32} marginBottom={24}>
            Profile
         </Heading>
         <div style={{ maxWidth: '320px', width: '100%' }}>
            <TextInputField
               name="name"
               label="Name"
               value={form.name}
               onChange={onChange}
               defaultValue={user?.name}
               placeholder="Enter your full name"
            />
            <TextInputField name="email" label="Email" defaultValue={user?.email} placeholder="Enter your email" disabled />
            <TextInputField
               name="username"
               label="Username"
               onChange={onChange}
               value={form.username}
               defaultValue={user?.username}
               placeholder="Enter your username"
            />
            <Pane>
               <Label htmlFor="bio" marginBottom={4} display="block">
                  Bio
               </Label>
               <Textarea id="bio" name="bio" placeholder="Write about yourself" value={form.bio} onChange={onChange} />
            </Pane>
            <Button
               marginTop={16}
               intent="success"
               onClick={onSubmit}
               appearance="primary"
               disabled={!hasFormChanged}
               isLoading={status === 'SAVING'}
            >
               Save
            </Button>
         </div>
      </div>
   )
}
