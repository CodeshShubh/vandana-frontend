import {BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import {lazy, Suspense, useEffect} from 'react'; // use for not rendering all files in network section in inspecion
// import {ProtectedRoute} from 'react-protected-route'
import Loader from './components/loader';
import Header from './components/header';
import {Toaster} from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { userExist, userNotExist } from './redux/reducer/userReducer';
import {useDispatch, useSelector } from 'react-redux'
import { getUser } from './redux/api/userAPI';
import { UserReducerInitialState } from './types/reducer-types';
import ProtectedRoute from './components/protected-route';



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
const ProductManagement = lazy(() => import("./pages/admin/management/productmanagement"));
const TransactionManagement = lazy(() => import("./pages/admin/management/transactionmanagement"));
const NotFound = lazy(() => import("./pages/not-found")); // notfund page
const Checkout = lazy(() => import("./pages/checkout"));  // for stripe

// main files lazy loading
const Home = lazy(()=>import('./pages/home'));
const Search = lazy(()=>import('./pages/search'));
const Cart = lazy(()=>import('./pages/cart'));

// not logged in route here user login itself
const Login = lazy(()=>import('./pages/login'));

// user need login to acces this route
const Shipping = lazy(()=>import('./pages/shipping'));
const Orders = lazy(()=>import('./pages/orders'));
const OrderDetails = lazy(()=>import( './pages/order-details'));


const App = () => {
// this is for taking user and loading
  const {user , loading} = useSelector((state:{userReducer:UserReducerInitialState})=> state.userReducer)

   const dispatch = useDispatch();

useEffect(() => {
  onAuthStateChanged(auth, async(user)=>{
     
    if(user){
      const data = await getUser(user.uid)
      dispatch(userExist(data.user));
    }else dispatch(userNotExist());
  });
}, []);

  return loading? <Loader/> :(
    <Router>
      {/* Header */}
      <Header user={user}/>
       <Suspense fallback={<Loader/>}>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/cart' element={<Cart/>}/>

        {/* not logged in route */}
        <Route path='/login' element={<ProtectedRoute isAuthenticated={user ? false:true}>
          <Login/>
        </ProtectedRoute>}/>

        {/* user need login to acces these route */}
          <Route element = {<ProtectedRoute isAuthenticated={user? true:false}/>} >
          <Route path='/shipping' element={<Shipping/>}/>
          <Route path='/orders' element={<Orders/>}/>
        <Route path='/order/:id' element={<OrderDetails/>}/>
        <Route path='/pay' element={<Checkout/>}/>
          </Route>

        {/* Admin Routes */}
            <Route
              element={<ProtectedRoute isAuthenticated={true} adminOnly={true} admin={user?.role==="admin" ? true : false} />}>
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
               {/* Not found route */}
            <Route path='*' element={<NotFound/>}/>
      </Routes>
       </Suspense>
       <Toaster position="bottom-center"/>
    </Router>
  )
}

export default App