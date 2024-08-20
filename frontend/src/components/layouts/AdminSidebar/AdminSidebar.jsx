import React from "react";
import styles from "./AdminSidebar.module.css";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const sidebarHandler = () => {
    // sideOptions(prevState => !prevState)
    const navSelector = document.getElementById("sidebarId");
    const iconSelector = document.getElementById("iconId");
    navSelector.classList.toggle(styles.disable);
    iconSelector.classList.toggle(styles.rotate);
  };
  return (
    <>
      <div className={styles.sidebarBox}>
        <div className={styles.sidebarHandlerIconBox}>
          <ArrowForwardIosIcon
            id="iconId"
            className={styles.sidebarHandlerIcon}
            onClick={sidebarHandler}
          />
        </div>
        <div id="sidebarId" className={`${styles.sidebar} ${styles.disable}`}>
          <div className={styles.dashboardIconBox}>
            <Link to={"/admin/dashboard"}>
              {" "}
              <DashboardIcon className={styles.dashboardIcon} />{" "}
              <p>Dashboard</p>
            </Link>
          </div>

          <div className={styles.productsIconBox}>
            <Link>
              <SimpleTreeView>
                <TreeItem itemId="1" label="Products">
                  <Link to={"/admin/products"}>
                    <ListAltIcon className={styles.allIcon} />
                    <TreeItem
                      className={styles.allTag}
                      itemId="2"
                      label="All"
                    />
                  </Link>

                  <Link to={"/admin/product"}>
                    <AddIcon className={styles.addIcon} />
                    <TreeItem
                      className={styles.createTag}
                      itemId="3"
                      id="3"
                      label="Create"
                    />
                  </Link>
                </TreeItem>
              </SimpleTreeView>
            </Link>
          </div>

          <div className={styles.orderIconBox}>
            <Link to={"/admin/orders"}>
              <ListAltIcon className={styles.orderIcon} /> Orders
            </Link>
          </div>

          <div className={styles.usersIconBox}>
            <Link to={"/admin/users"}>
              <PeopleAltIcon className={styles.userIcon} /> User
            </Link>
          </div>

          <div className={styles.reviewsIconBox}>
            <Link to={"/admin/reviews"}>
              <ListAltIcon className={styles.reviewIcon} /> Reviews
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
