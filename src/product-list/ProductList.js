import React, {Fragment, useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

import Container from '../container/Container';
import chevronRight from '../assets/images/chevron-right.svg';
import heartIcon from '../assets/images/heart.svg';
import sliders from '../assets/images/sliders.svg';
import arrowUp from '../assets/images/arrow-up.svg';
import arrowDown from '../assets/images/arrow-down.svg';
import crossIcon from '../assets/images/x.svg';
import CategoryBanner from '../banner/CategoryBanner';
import {loadProducts} from '../redux/action';

export default function ProductList() {
    const [loader, setLoader] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [lowerRange, setLowerRange] = useState(0);
    const [upperRange, setUpperRange] = useState(12);
    const id = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSortWindowVisible, setIsSortWindowVisible] = useState(true);
    const [isFilterWindowVisible, setIsFilterWindowVisible] = useState(true);
    const [checkedData, setCheckedData] = useState([]);
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [filteredResults, setFilteredResults] = useState([]);
    const store = useSelector(state => state.data);

    let storeData = [...store.products];

    //load products from redux store
    useEffect(() => {
        dispatch(loadProducts());
    }, []);

    //toggle the visibility of the filter and sort components 
    //in different screen sizes
    useEffect(() => {
        const windowResizeHandler = () => {
            if(window.innerWidth > 990) {
                setIsSortWindowVisible(() => true);
                setIsFilterWindowVisible(() => true);
            }
            else if(window.innerWidth < 990) {
                setIsSortWindowVisible(() => false);
                setIsFilterWindowVisible(() => false); ;
            }
        };
        window.addEventListener('resize', windowResizeHandler);

        return () => {
            window.removeEventListener('resize', windowResizeHandler);
        };
    }, []);

    const selectChangeHandler = (event) => {
        let tempArr = [];

        if(event.target.value === 'lowerPrice') {
            tempArr = filteredResults.sort((val1, val2) => (val1.price > val2.price) ? 1 : -1);
            setIsFilterActive(true);
            console.log('lowerPrice ',tempArr);
        }
        if(event.target.value === 'higherPrice') {
            tempArr = filteredResults.sort((val1, val2) => (val1.price < val2.price) ? 1 : -1);
            setIsFilterActive(true);
            console.log('higherPrice ',tempArr);
        }
        if(event.target.value === 'desc') {
            tempArr = filteredResults.sort((val1, val2) => (val1.id < val2.id) ? 1 : -1);
            setIsFilterActive(true);
            console.log('desc ',tempArr);
        }
        if(event.target.value === 'asc') {
            tempArr = filteredResults.sort((val1, val2) => (val1.id > val2.id) ? 1 : -1);
            setIsFilterActive(true);
            console.log('asc ',tempArr);
        }
        if(tempArr.length === 0) {
            tempArr = [...store.products];
            setIsFilterActive(true);
        }
        setFilteredResults(() => tempArr.map(item => item));
    }

    const paginationClickHandler = (event,id) => {
        event.preventDefault();

        if(id === 1) {
            setLowerRange(0);
            setUpperRange(12);
        }
        if(id === 2) {
            setLowerRange(12);
            setUpperRange(24);
        }
    }

    //show sort Window
    const showSortWindow = () => {
        setIsSortWindowVisible(true);
    }
    //hide sort Window
    const hideSortWindow = () => {
        setIsSortWindowVisible(false);
    }

    //show filter window
    const showFilterWindow = () => {
        setIsFilterWindowVisible(true);
    }

    //hide filter window
    const hideFilterWindow = () => {
        setIsFilterWindowVisible(false);
    }

    let checkedVal = [...checkedData];


    const filterCategoryHandler = (event) => {
        if(event.target.checked) { 
            checkedVal.push(event.target.value);
            setIsFilterActive(true);
        } 
        else {
            var targetedValIndex = checkedVal.indexOf(event.target.value); 
            if (targetedValIndex !== -1){
                checkedVal.splice(targetedValIndex, 1);
                setIsFilterActive(true);
            }
        }

        setCheckedData(checkedVal);
        
        let tempArr = [];

        for(let i=0; i< storeData.length; i++) {
            for(let j=0; j< checkedVal.length; j++) {
                if(storeData[i].category === checkedVal[j]) {
                    tempArr.push(storeData[i]);
                }
            }
        }

        if(tempArr.length === 0) {
            tempArr = [...store.products];
        }
        setFilteredResults(() => tempArr.map(item => item));
    }

  return (
    <Fragment>
        <CategoryBanner />
        <Container> 
            {
               store.products.length === 0 
               ? <div className='loader-text'>{store.loaderText}</div> :
            <div className='product-list-wrapper'>
                <div className='product-list-toolbar'>
                    <div className='toolbar-section1'>
                        <p>Clothing / Women’s / Outerwear</p>
                    </div>
                    <div className='toolbar-section2'>
                        <div className='result-count'>
                            <p>{!isFilterActive ? store.products.length : filteredResults.length} Results</p>
                        </div>
                        <div className='sort-section'>
                            {isSortWindowVisible &&
                            <div className='mobile-sort-window'>
                                <select name="sort" id="sort-box" onChange={selectChangeHandler}>
                                    <option value='desc'>Sort by Latest</option>
                                    <option value='asc'>Sort by Oldest</option>
                                    <option value='lowerPrice'>Sort by Lower Price</option>
                                    <option value='higherPrice'>Sort by Higher Price</option>
                                </select>
                                <button onClick={hideSortWindow}>Close</button>
                            </div>
                            }
                            <div className='mobile-filter-menu'>
                                <ul className='filter-section1' onClick={showFilterWindow}>
                                    <li>
                                        <a href='#'>
                                            <img src={sliders} alt='filter icon'/>
                                            Filter Results
                                        </a>
                                    </li>
                                </ul>
                                <ul className='filter-section2' onClick={showSortWindow}>
                                    <li>
                                        <a href='#'>
                                            <span>
                                                <img src={arrowUp} alt='arrow up'/>
                                                <img src={arrowDown} alt='arrow down'/>
                                            </span>
                                            Sort Products
                                        </a>
                                    </li>  
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='product-list-section'>
                    {isFilterWindowVisible &&
                    <div className='product-list-filter'>
                        <div className='filter-header'>
                            <h3>Filters</h3>
                            <button onClick={hideFilterWindow}>
                                <img src={crossIcon} alt='x'/>
                            </button>
                        </div>
                        <div className='filter-category'>
                            <h3>Categories</h3>
                            <ul>
                                
                                <li>
                                    
                                    <input type="checkbox" id="jewelery" name="jewelery" value="jewelery"  onChange={filterCategoryHandler}/>
                                    Jewelery
                                </li>

                                <li>
                                    <input type="checkbox" id="electronic" name="electronics" value="electronics"  onChange={filterCategoryHandler}/>
                                    Electronics
                                </li>

                                <li>
                                    <input type="checkbox" id="women" name="women's clothing" value="women's clothing" onChange={filterCategoryHandler}/>
                                    Women's clothing
                                </li>


                                
                                <li>
                                    <input type="checkbox" id="men" name="men's clothing" value="men's clothing" onChange={filterCategoryHandler}/>
                                    Men's clothing
                                </li>
                            </ul>
                        </div>
                        <div className='filter-style'>
                            <h3>Brands</h3>
                            <ul>
                                <li>
                                    <input type="checkbox" id="Outdoor" name="Adidas"/>
                                    Adidas
                                </li>
                                <li>
                                    <input type="checkbox" id="Casual" name="Nike"/>
                                    Nike
                                </li>
                                <li>
                                    <input type="checkbox" id="Athleisure" name="Puma"/>
                                    Puma
                                </li>
                                <li>
                                    <input type="checkbox" id="Runnig" name="Sketchers"/>
                                    Sketchers
                                </li>
                                <li>
                                    <input type="checkbox" id="Active" name="Reebok"/>
                                    Reebok
                                </li>
                            </ul>
                        </div>
                        <div className='filter-color'>
                            <h3>Color</h3>
                            <div className='color-box'>
                                <div className='color-card' id='black'/>
                                <div className='color-card' id='white'/>
                                <div className='color-card' id='green'/>
                                <div className='color-card' id='yellow'/>
                                <div className='color-card' id='blue'/>
                                <div className='color-card' id='red'/>
                                <div className='color-card' id='purple'/>
                                <div className='color-card' id='pink'/>
                                <div className='color-card' id='saffron'/>
                                <div className='color-card' id='gradient'/>
                            </div>
                        </div>

                        <div className='filter-style'>
                            <h3>Style</h3>
                            <ul>
                                <li>
                                    <input type="checkbox" id="Outdoor" name="Gym"/>
                                    Gym
                                </li>
                                <li>
                                    <input type="checkbox" id="Casual" name="Formal"/>
                                    Formal
                                </li>
                                <li>
                                    <input type="checkbox" id="Athleisure" name="Sports"/>
                                    Sports
                                </li>
                                <li>
                                    <input type="checkbox" id="Runnig" name="Casual"/>
                                    Casual
                                </li>
                                <li>
                                    <input type="checkbox" id="Active" name="Denim"/>
                                    Denim
                                </li>
                            </ul>
                        </div>
                        


                    </div>
                    }
                    <div className='product-list-display'>
                        <div className='product-list-box'>
                            {
                                !isFilterActive ? 
                                store.products.filter((item, index) => index >= lowerRange && index < upperRange)
                                .map((product, index) => 
                                <div className='product-card' key={index}>
                                    <div className='product-image' 
                                        title='Click to view product details'
                                        onClick={() => navigate(`/product-details/${product.id}`)}
                                    >
                                        <img src={product.image} alt='product picture'/>
                                    </div>
                                    <ul className='product-info'>
                                        <li>{product.title !== undefined && product.title.split(' ').slice(0,3).join(' ')}</li>
                                        <li>${product.price}</li>
                                        <li>
                                            <a href='#'>
                                                <img src={heartIcon} alt='heart icon'/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                )
                                :
                                filteredResults.filter((item, index) => index >= lowerRange && index < upperRange)
                                .map((product, index) => 
                                <div className='product-card' key={index}>
                                    <div className='product-image' 
                                        title='Click to view product details'
                                        onClick={() => navigate(`/product-details/${product.id}`)}
                                    >
                                        <img src={product.image} alt='product picture'/>
                                    </div>
                                    <ul className='product-info'>
                                        <li>{product.title !== undefined && product.title.split(' ').slice(0,3).join(' ')}</li>
                                        <li>${product.price}</li>
                                        <li>
                                            <a href='#'>
                                                <img src={heartIcon} alt='heart icon'/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                )
                            }
                        </div>
                        <div className={!loader ? 'pagination-section' : 'pagination-section inactive'}>
                            <ul>
                                <li><a href='#' id='1' onClick={ (event) => paginationClickHandler(event, 1)}>1</a></li>
                                <li><a href='#' id='2' onClick={ (event) => paginationClickHandler(event, 2)}>2</a></li>
                            </ul>
                            <a href='#'>
                                <img src={chevronRight} id='chevronRight' alt='chevron right icon'/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            }
        </Container>
    </Fragment>
  )
}
