import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar'

// import { BtnGoogle } from '@/components/auth/BtnGoogle'
// import { ModeToggle } from '@/components/Mode-toggle'
import { BtnSignIn } from '../auth/BtnSignIn'

export default function NavBar() {
  return (
    <>
      <div className="flex bg-gray-950 p-2 gap-2">
        <Menubar className="bg-gray-950 border-transparent text-white flex flex-grow">
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>New Window</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Share</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <BtnSignIn />
        {/* <ModeToggle /> */}
      </div>
    </>
  )
}
