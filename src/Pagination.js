// import React from 'react';
 
// /** * Pagination Method
//  * @memberof RecentActivity
//  * @type {Function}
//  * @extends Component
//  * This is responsibe of the pagination Requirement that is used in Recent Activity
//  * 
   
//    *@type {Number}
//  * @param {TotalPages}  
//  * Pages is the total number of pages
//  * 
//  *  @type {Number}
//  * @param {currentPage}  
//  * Current Page that the user is on 
//  *
//  *  @type {Number}
//  * @param {NextPage} 
//  * the next page that will be fetched depending on whether user clicked next or previous
//  * 
//  * 
//  */

// const Pagination = (props) => {
//     /**
//      * Number of links of pages that appear down on the pagination bar 
//      * @type {Array}
//      * @param {Pagelinks}  
//      */
//     let pageLinks = [] 
    
//     for(let i = 1; i <= props.pages + 1; i++ ) {
//         let active = props.currentPage === i ? 'active' : '';
//         pageLinks.push(<li className={`waves-effect ${active}`} key={i} onClick={() => props.nextpage(i)}> <span class="notify-time">{i}</span></li>)              
//     }
 
//     return ( 
//             <div className="container">
//                 <div className="row">
//                     <ul className="pagination">
//                         { props.currentPage > 1 ? <li className="waves-effect" onClick={() => props.nextpage(props.currentPage - 1)}><span class="notify-time">Prev</span></li> : ''}
//                         {/* {console.log(props.currentPage)} */}
//                         { props.currentPage < props.pages + 1 ? <li className="waves-effect" onClick={() => props.nextpage(props.currentPage + 1)}><span class="notify-time">Next</span></li> : ''} 
//                         {/* {console.log(props.pages)} */}
//                     </ul>
//                 </div>        
//             </div>
//     )
// }

// export default Pagination



  
  import React from 'react';
  import { makeStyles } from '@material-ui/core/styles';
  import Typography from '@material-ui/core/Typography';
  import Pagination from '@material-ui/lab/Pagination';
  
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
  
  export default function PaginationControlled(props) {
    const classes = useStyles();
    // const [page, setPage] = React.useState(1);
    // // const handleChange = (event, value) => {
    // //   setPage(value);
    // // };
    const { items } = usePagination({
        count: Math.ceil(this.state.totalResults/10),
      });
  
    return (
      <div >
        {/* <Typography>Page: {page}</Typography> */}
        <Pagination count={items} page={page} onChange={props.handleChange} />
      </div>
    );
  }
  