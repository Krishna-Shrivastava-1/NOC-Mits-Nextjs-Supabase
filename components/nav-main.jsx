"use client"

import { usePathname } from "next/navigation"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { IconChevronRight } from "@tabler/icons-react"

export function NavMain({ items, renderIcon, isOpen }) {
  const pathname = usePathname()

  const isItemActive = (item) =>
    item.items?.some((subItem) => pathname === subItem.url)

  return (
    <SidebarGroup>
      {/* Label only shows when sidebar is open */}
      <SidebarGroupLabel className={`transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
        Platform
      </SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => {
          const active = isItemActive(item)

          return (
            <Collapsible
              key={item.title}
              defaultOpen={active}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className={`flex items-center gap-3 transition-all duration-200 ${
                      active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/60"
                    }`}
                  >
                    {renderIcon(item.icon)}

                    {/* Text labels show/hide based on isOpen prop */}
                    <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${
                      isOpen ? "w-auto opacity-100 ml-2" : "w-0 opacity-0"
                    }`}>
                      {item.title}
                    </span>

                    {isOpen && (
                      <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {/* Only show sub-items if the sidebar is actually open */}
                {isOpen && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => {
                        const subActive = pathname === subItem.url
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a
                                href={subItem.url}
                                className={`flex items-center px-3 py-1.5 rounded-md ${
                                  subActive ? "bg-primary/20 text-primary" : "hover:bg-sidebar-accent/40"
                                }`}
                              >
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

// "use client"

// import { usePathname } from "next/navigation"
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible"

// import {
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "@/components/ui/sidebar"

// import { IconChevronRight } from "@tabler/icons-react"

// export function NavMain({ items, renderIcon }) {
//   const pathname = usePathname()

//   const isItemActive = (item) =>
//     item.items?.some((subItem) => pathname === subItem.url)

//   return (
//     <SidebarGroup>
//       <SidebarGroupLabel className="opacity-0 group-hover:opacity-100 transition">
//         Platform
//       </SidebarGroupLabel>

//       <SidebarMenu>
//         {items.map((item) => {
//           const active = isItemActive(item)

//           return (
//             <Collapsible
//               key={item.title}
//               defaultOpen={active}
//               className="group/collapsible"
//             >
//               <SidebarMenuItem>

//                 <CollapsibleTrigger asChild>
//                   <SidebarMenuButton
//                     className={`
//                       flex items-center gap-3
//                       transition-all duration-200
//                       ${active
//                         ? "bg-sidebar-accent text-sidebar-accent-foreground"
//                         : "hover:bg-sidebar-accent/60"}
//                     `}
//                   >
//                     {renderIcon(item.icon)}

//                     <span className="opacity-0 group-hover:opacity-100 transition">
//                       {item.title}
//                     </span>

//                     <IconChevronRight className="
//                       ml-auto opacity-0 group-hover:opacity-100
//                       transition-transform duration-200
//                       group-data-[state=open]/collapsible:rotate-90
//                     " />
//                   </SidebarMenuButton>
//                 </CollapsibleTrigger>

//                 <CollapsibleContent>
//                   <SidebarMenuSub>
//                     {item.items?.map((subItem) => {
//                       const subActive = pathname === subItem.url

//                       return (
//                         <SidebarMenuSubItem key={subItem.title}>
//                           <SidebarMenuSubButton asChild>
//                             <a
//                               href={subItem.url}
//                               className={`
//                                 flex items-center px-3 py-1.5 rounded-md
//                                 ${subActive
//                                   ? "bg-primary/20 text-primary"
//                                   : "hover:bg-sidebar-accent/40"}
//                               `}
//                             >
//                               <span className="opacity-0 group-hover:opacity-100 transition">
//                                 {subItem.title}
//                               </span>
//                             </a>
//                           </SidebarMenuSubButton>
//                         </SidebarMenuSubItem>
//                       )
//                     })}
//                   </SidebarMenuSub>
//                 </CollapsibleContent>

//               </SidebarMenuItem>
//             </Collapsible>
//           )
//         })}
//       </SidebarMenu>
//     </SidebarGroup>
//   )
// }
