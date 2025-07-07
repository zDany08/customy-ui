## Customy UI

There are many React UI libraries nowadays but, personally, I've always struggled trying to customize them (both style and functionality). Since most UI components are "standard" and used in almost all types of website/web app, I needed a way to re-use them across projects, so Customy UI was born.

> **!!! IMPORTANT !!!**<br>
Customy UI is NOT compatible with React Native, use it for WEB ONLY.

### How It Works

Customy UI uses a different approach to ensure customization without having a mass of props to change the styling. Bigger/more complex components are subdivided in sub-components, so you can build your own "library" by assembling them together. This allows you to change the appearance of your components without overwhelming custom-styling systems. You can also add custom functionality if you need.

Here's an example:

![SignInDemo](https://imgur.com/ek7Q7DK.png)

```js
// "use client"; If you use Next.js

import { useState, useCallback } from "react";
import { Container, TextField, Button } from "customy-ui";

export default function SignInForm() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const onChangeEmail = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value), []);
    const onChangePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value), []);
    const onSignIn = useCallback(() => alert(`Signed in as ${email}`), [email]);
    return (
        <Container className="flex-col items-center gap-8">
            <h1 className="text-[1.8rem] text-[#3b3b3b]">Sign In</h1>
            <div className="flex flex-col gap-2">
                <TextField placeholder="Email" value={email} onChange={onChangeEmail} />
                <TextField type="password" placeholder="Password" value={password} onChange={onChangePassword} />
            </div>
            <Button onClick={onSignIn}>Sign In</Button>
        </Container>
    );
}
```

As you can see, every component is fully customizable and pretty straightforward to use.

Here's another example:

![SignUpDemo](https://imgur.com/nnfeZQy.png)

```js
// "use client"; If you use Next.js

import { useState, useCallback } from "react";
import { FaUser, FaUserTie, FaCrown } from "react-icons/fa6";
import { Container, Button, TextField, TextArea, Dropdown, DropdownOption } from "customy-ui";

export type UserType = "member" | "moderator" | "admin";

export default function SignUpForm() {
    const [username, setUsername] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [userType, setUserType] = useState<UserType>("member");
    const [userTypeShown, setUserTypeShown] = useState<boolean>(false);
    const onChangeUsername = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value), []);
    const onChangeBio = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => setBio(event.target.value), []);
    const onChangeEmail = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value), []);
    const onChangePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value), []);
    const onShowUserType = useCallback(() => setUserTypeShown(true), []);
    const onHideUserType = useCallback(() => setUserTypeShown(false), []);
    const onChangeUserType = useCallback((value?: string) => setUserType(value as UserType), []);
    const onSignUp = useCallback(() => alert(`Signed up as ${email} (${username})`), [email, username]);
    return (
        <Container className="flex-col items-center gap-8">
            <h1 className="text-[1.8rem] text-[#3b3b3b]">Sign Up</h1>
            <div className="flex flex-col gap-2">
                <TextField placeholder="Username" value={username} onChange={onChangeUsername} />
                <TextArea placeholder="Bio" value={bio} onChange={onChangeBio} />
                <TextField placeholder="Email" value={email} onChange={onChangeEmail} />
                <TextField type="password" placeholder="Password" value={password} onChange={onChangePassword} />
                <Dropdown shown={userTypeShown} onShow={onShowUserType} onHide={onHideUserType} placeholder="User Type" value={userType} onChange={onChangeUserType}>
                    <DropdownOption className="gap-4" option="member">
                        <FaUser />
                        <span>Member</span>
                    </DropdownOption>
                    <DropdownOption className="gap-4" option="moderator">
                        <FaUserTie />
                        <span>Moderator</span>
                    </DropdownOption>
                    <DropdownOption className="gap-4" option="admin">
                        <FaCrown />
                        <span>Admin</span>
                    </DropdownOption>
                </Dropdown>
            </div>
            <Button onClick={onSignUp}>Sign Up</Button>
        </Container>
    );
}
```

In this case, we have a _DropDown_, a pre-assembled component for a quick setup and less customizable, but you can create your own with _DropdownField_ & _DropdownMenu_ components.

There is also a dark mode version for those who use [Tailwind](https://tailwindcss.com/docs/dark-mode#using-a-data-attribute), you can enable it by adding a _data-theme=dark_ on a parent component.

### Component Index

This is a list of available components you can use. Each component with "pre-built" label is a pre-assembled boilerplate component you can use if you don't need customization (e.g. testing/debugging projects).

- Container
- Button
- TextField
- TextArea
- Dropdown _(pre-built)_
- DropdownField
- DropdownMenu
- DropdownOption

### Customy UI's Future

It all started for a personal need but I wanted to share this library because I think it has a high potential. However, I don't guarantee Customy UI will be constantly updated and fixed, so you're free to contribute.
