import React from "react";
import { useEffect, useState } from "react";
import styles from "../styles/ShopNameItem.module.css";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GiRecycle } from "react-icons/gi";
import { MdAddCircleOutline } from "react-icons/md";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import { useUserMeta } from "../utils/UserMetaContext";


const ShopNameItem = ({
  name,
  icon,
  id,
  deleteListItem,
  toggleItemAsCompleted,
  setNameClicked,
  setListItems,
  compareName,
}) => {
  const { user, error, isLoading } = useUser();
  const metaUser = useUserMeta()

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  function handleClick() {
    setNameClicked(name);
    compareName(name);
  }

  return (
    user && (
      <div className={styles.shopItemContainer}>
        <div className={styles.background} style={{ backgroundColor: metaUser.user_metadata.theme_id }}>
          <img src={metaUser.user_metadata.avatar_id} alt="user avatar icon" width={55} />
        </div>
        <div className={styles.shopNameItem}>
          <div className={styles.cardTop}></div>

          <div className={styles.cardText}>
            <a onClick={handleClick}>
              <p>
                {user.name} {name}'s List
              </p>
            </a>
          </div>

          <div className={styles.icons}>
            <div className={styles.iconLeft}></div>

            <div className={styles.iconRight}>
              {/* <div className={styles.edit}>
                <FaRegEdit />
              </div> */}
              <div
                className={styles.delete}
                onClick={() => {
                  deleteListItem(name);
                }}
              >
                <RiDeleteBin6Line />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${styles.avatarsNotification} theme-avatar-notification`}
        >
          <div className={styles.avatarBox1}>
            <div className={styles.notification1}>1</div>
            <img
              className={styles.usersAvatar}
              src="/user_avatar_1.svg"
              width={20}
            />
          </div>
          <div className={styles.avatarBox2}>
            <div className={styles.notification2}>2</div>
            <img className={styles.usersAvatar} src="/user_avatar_1.svg" />
          </div>
          <div className={styles.avatarBox3}>
            <div className={styles.notification3}>4</div>
            <img className={styles.usersAvatar} src="/user_avatar_1.svg" />
          </div>
          <div className={styles.avatarBox4}>
            <div className={styles.notification4}>2</div>
            <img className={styles.usersAvatar} src="/user_avatar_1.svg" />
          </div>
        </div>
      </div>
    )
  );
};
export default ShopNameItem;
