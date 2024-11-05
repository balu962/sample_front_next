
import React, {ReactNode} from 'react';
import Navbar from "./layoutParts/Navbar";
import Sidebar from "./layoutParts/Sidebar";
import BlogAdmin from "./layoutParts/BlogAdmin"

export default function Layout ({children}:{children: ReactNode}) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ display: 'flex', flex: 1 }}>
          <div style={{ width: '20%', backgroundColor: '#f0f0f0' }}>
            <BlogAdmin/>
            <Sidebar />
          </div>
          <div style={{ width: '80%' }}>
          {children}
          </div>
        </div>
      </div>
    )
}