import React from "react";
import "./sidebar.css";
import logo from "../../images/logo2.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce" />
      </Link>


      <TreeView
        className="product"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ImportExportIcon />}
      >
        <TreeItem nodeId="1" label="Products">
          <Link to="/admin/products">
            <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
          </Link>

          <Link to="/admin/product">
            <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
          </Link>
        </TreeItem>
      </TreeView>


      <Link to="/account" >
        <p>
          <AccountBoxIcon /> Account
        </p>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link >

    </div >
  );
};

export default Sidebar;
