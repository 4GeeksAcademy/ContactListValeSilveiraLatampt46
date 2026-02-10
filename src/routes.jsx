import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { AddContact } from "./pages/AddContact";
import EditContact from "./pages/EditContact";



export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="add-contact" element={<AddContact />} />
      <Route path="edit-contact/:id" element={<EditContact />} />

    </Route>
    


  )
);
