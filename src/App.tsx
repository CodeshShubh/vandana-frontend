import {BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import {lazy, Suspense, useEffect} from 'react'; // use for not rendering all files in network section in inspecion
// import {ProtectedRoute} from 'react-protected-route'
import Loader from './components/loader';
import Header from './components/header';
import {Toaster} from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { userExist, userNotExist } from './redux/reducer/userReducer';
import {useDispatch } from 'react-redux'
import { getUser } from './redux/api/userAPI';



// this Admin Routes lazy loading import copy form admindashboard
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/products"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
const Toss = lazy(() => import("./pages/admin/apps/toss"));
const NewProduct = lazy(() => import("./pages/admin/management/newproduct"));
const ProductManagement = lazy(
  () => import("./pages/admin/management/productmanagement")
);
const TransactionManagement = lazy(
  () => import("./pages/admin/management/transactionmanagement")
);



// main files lazy loading
const Home = lazy(()=>import('./pages/home'));
const Search = lazy(()=>import('./pages/search'));
const Cart = lazy(()=>import('./pages/cart'));






// not logged in route here user login itself
const Login = lazy(()=>import('./pages/login'));




// user need login to acces this route
const Shipping = lazy(()=>import('./components/shipping'));
const Orders = lazy(()=>import('./pages/orders'));
const OrderDetails = lazy(()=>import( './pages/order-details'));



const App = () => {

   const dispatch = useDispatch();

useEffect(() => {
  onAuthStateChanged(auth, async(user)=>{
     
    if(user){
      const data = await getUser(user.uid)
      dispatch(userExist(data.user));
    }else dispatch(userNotExist());
  });
}, []);




  return (
    <Router>
      {/* Header */}
      <Header user{null}/>
       <Suspense fallback={<Loader/>}>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/cart' element={<Cart/>}/>




        {/* not logged in route */}
        <Route path='/login' element={<Login/>}/>





        {/* user need login to acces these route */}
          <Route>
          <Route path='/shipping' element={<Shipping/>}/>
          <Route path='/orders' element={<Orders/>}/>
        <Route path='/order/:id' element={<OrderDetails/>}/>
          </Route>


        {/* Admin Routes */}
      
            <Route
              // element={
              //   <ProtectedRoute isAuthenticated={true} adminRoute={true} isAdmin={true} />
              // }
            >
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/product" element={<Products />} />
              <Route path="/admin/customer" element={<Customers />} />
              <Route path="/admin/transaction" element={<Transaction />} />
              {/* Charts */}
              <Route path="/admin/chart/bar" element={<Barcharts />} />
              <Route path="/admin/chart/pie" element={<Piecharts />} />
              <Route path="/admin/chart/line" element={<Linecharts />} />
              {/* Apps */}
              <Route path="/admin/app/coupon" element={<Coupon />} />
              <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
              <Route path="/admin/app/toss" element={<Toss />} />

              {/* Management */}
              <Route path="/admin/product/new" element={<NewProduct />} />

              <Route path="/admin/product/:id" element={<ProductManagement />} />

              <Route path="/admin/transaction/:id" element={<TransactionManagement />} />
            </Route>;
      </Routes>
       </Suspense>
       <Toaster position="bottom-center"/>
    </Router>
  )
}

export default App