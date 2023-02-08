import { useState } from "react";
import { Provider } from "react-redux";
import './App.css';
import store from './store.js';
import SearchBar from './components/SearchBar';
import Sidebar from './components/SideBar';
import ProductBox from './components/ProductBox';
import ParentComponent from './components/ParentComponent';

function App() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([])


  return (
    <Provider store={store}>
      <div className="App">
        <div className="flex justify-center">
          <SearchBar selectedPriceRange={selectedPriceRange} />
        </div>
        <div className='mt-5'>
          <ParentComponent>
            <Sidebar selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} selectedPriceRange={
              selectedPriceRange
            } setSelectedPriceRange={setSelectedPriceRange} />
            <ProductBox

              selectedFilters={selectedFilters}
              selectedPriceRange={selectedPriceRange} />
          </ParentComponent>
        </div>

      </div>
    </Provider>
  );
}

export default App;
