import React from 'react';
import { Link } from 'react-router-dom';

const Category = props => {
    if(!props.categories){
        return null;
    }
    let sub = props.categories.subcategories
    return (
        <ul>
            {Object.keys(sub).map(ele =>{
                if(Object.keys(sub[ele].pl).length===0){
                    return null;
                }
                if(Object.keys(sub[ele].subcategories).length===0){
                    return(
                        <li key={sub[ele].id}>{sub[ele].name}</li>
                    );
                }
                if(sub[ele].parentcategory===0){
                    return(
                        <li key={sub[ele].id}>
                            <div className="first-category">{sub[ele].name}</div>
                            <Category 
                            categories={sub[ele]}
                            firstpl={props.firstpl}
                            secondpl={props.secondpl}
                            nameslug={props.nameslug}/>
                        </li>
                    );
                }
                return (
                    <li key={sub[ele].id}>
                    <Link to={`/article/${sub[ele].nameslug}`}>{sub[ele].name}</Link>
                    <Category 
                        categories={sub[ele]}
                        firstpl={props.firstpl}
                        secondpl={props.secondpl}
                        nameslug={props.nameslug}/>
                    </li>
                );
            })}
        </ul>
    );
}

// const Recursive = props =>{
//     if(Object.keys(props.sub).length===0){
//         return null;
//     }
//     return(
//         <ul>
//             {Object.keys(props.sub).map(ele =>{
//                 return (
//                     <Category 
//                         categories={props.sub[ele]}
//                         firstpl={props.firstpl}
//                         secondpl={props.secondpl}
//                         nameslug={props.nameslug}/>
//                 );
//             })}
//         </ul>
//     )
// }

// const Category = props =>{
//     let sub = props.categories.subcategories
//     if(!props.categories){
//         return null;
//     }
//     if(props.categories.id===0){
//         return(
//             <Recursive 
//                 sub={sub}
//                 firstpl={props.firstpl}
//                 secondpl={props.secondpl}
//                 nameslug={props.nameslug}/>
//         );
//     }
//     if(Object.keys(props.categories.pl).length===0){
//         return null;
//     }
//     if(props.categories.parentcategory===0||Object.keys(sub).length===0){
//         return(
//             <li key={props.categories.id} className={`${props.categories.nameslug}-${props.categories.id}`}>
//             <div>{props.categories.name}</div>
//             <Recursive 
//                 sub={sub}
//                 firstpl={props.firstpl}
//                 secondpl={props.secondpl}
//                 nameslug={props.nameslug}/>
//             </li>
//         );
//     }
    
//     return(
//         <li key={props.categories.id} className={`${props.categories.nameslug}-${props.categories.id}`}>
//         <Link to={`/article/${props.categories.nameslug}`}>{props.categories.name}</Link>
//         <Recursive 
//                 sub={sub}
//                 firstpl={props.firstpl}
//                 secondpl={props.secondpl}
//                 nameslug={props.nameslug}/>
//         </li>
//     )
// }

export default Category;