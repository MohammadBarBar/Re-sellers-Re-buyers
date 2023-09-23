import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ResellerRebuyerForm from "../components/ResellerRebuyerForm/ResellerRebuyerForm";
import ResellerRebuyerList from "../components/ResellerRebuyerList/ResellerRebuyerList";
import RootLayout from "../layouts/RootLayout";
import NotFound from "../components/NotFound/NotFound";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/home" element={<ResellerRebuyerList />} />
      <Route path="/addreSellerReBuyer" element={<ResellerRebuyerForm />} />
      <Route path="/addreSellerReBuyer/:id" element={<ResellerRebuyerForm />} />
      <Route path="/not-found" element={<NotFound />} />
    </Route>
  )
);

export default Router;
