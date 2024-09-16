import { Outlet, NavLink } from "react-router-dom";
import { Suspense } from "react";

interface INavItem {
  href: string;
  title: string;
  end?: boolean;
}

function App() {
  const navItems: INavItem[] = [
    {
      href: "",
      title: "Home",
      end: true,
    },
    {
      href: "post-list",
      title: "Post List",
    },
    {
      href: "signin",
      title: "Signin",
    },
  ];

  return (
    <Suspense fallback={<p>whole page loading...</p>}>
      <header className="flex items-center justify-evenly">
        <p>header</p>
        <nav>
          <ul className="flex items-center justify-evenly gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className={({ isActive, isPending }) =>
                    isPending ? "text-blue-400" : isActive ? "text-red-400" : ""
                  }
                  end={item.end}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="text-center">footer</footer>
    </Suspense>
  );
}

export default App;
