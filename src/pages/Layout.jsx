import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { StoreContext } from "../hooks/useGlobalReducer.jsx";



export const Layout = () => {
  const { actions } = useContext(StoreContext);

  useEffect(() => {
    actions.createAgendaIfNotExists();
    actions.get_contacts();
  }, []);

  return (
    <div>
      <header></header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
