import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { cardStyles } from "./styles";
import SearchBar from "./SearchBar";
import ModalWindow from "./Modal";
import {
  Pagination,
  AppBar,
  Card,
  CardMedia,
  Grid,
  Toolbar,
  Typography,
  Box,
  CircularProgress,
  Chip,
  Button,
  IconButton,
} from "@mui/material";
import { getSearchedPhotos } from "./photos/state/photosActions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const MainPage = (photos) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const classes = cardStyles();
  const [photoUrl, setPhotoUrl] = useState("");
  const dispatch = useDispatch();
  const [favoriteAdded, setFavoriteAdded] = useState(false);

  useEffect(() => {
    if (!!photos.photos.photo.length) {
      setLoading(false);
    }
  }, [photos]);

  useEffect(() => {
    if (!searchQuery) {
      setLoading(true);
      getSearchedPhotos(dispatch, page, "dog");
    }

    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        setLoading(true);
        const search = searchQuery.toString().replace(" ", "+");
        getSearchedPhotos(dispatch, page, search);
      }
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, searchQuery, page]);

  const handleModal = () => setOpen(!open);
  const tags = ["Cat", "Dog", "Chocholate", "Coffee"];

  const handleFavorite = (imageUrl) => {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites) {
      if (!checkIsInFavorites(imageUrl)) {
        favorites.push(imageUrl);
      } else {
        favorites.splice(favorites.indexOf(imageUrl), 1);
      }
    } else {
      favorites = [];
      favorites.push(imageUrl);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setFavoriteAdded(!favoriteAdded);
  };

  const checkIsInFavorites = (imgUrl) => {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    let favorite;
    if (favorites) {
      favorite = favorites.find((image) => {
        return image === imgUrl;
      });
    }
    if (favorite) {
      return true;
    }
    return false;
  };

  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar sx={{ backgroundColor: "#f2f2f2" }}>
          <Grid container justifyContent={"space-between"}>
            <Grid item container xs={4}>
              <Typography variant="h6" color="black" noWrap>
                Test
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <main>
        {open && (
          <ModalWindow
            handleModal={handleModal}
            openModal={open}
            imageUrl={photoUrl}
          />
        )}

        <Box sx={{ p: 5 }}>
          <SearchBar
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          />
          <Grid container item justifyContent={"start"} sx={{ py: 1, px: 3 }}>
            {tags.map((tag) => (
              <Chip
                label={tag}
                color="primary"
                onClick={() => setSearchQuery(tag)}
              />
            ))}
          </Grid>
        </Box>

        <Grid container spacing={3} justifyContent={"center"} sx={{ p: 5 }}>
          {loading && <CircularProgress />}
          {!!photos.photos.photo.length &&
            !loading &&
            photos.photos.photo.map((photo) => {
              const photoUrl = `http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
              return (
                <Grid item container key={photo.id} xs={12} sm={6} md={2}>
                  <Card className={classes.card}>
                    <IconButton
                      className={classes.favChip}
                      onClick={() => handleFavorite(photoUrl)}
                    >
                      {checkIsInFavorites(photoUrl) ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>

                    <CardMedia
                      component="img"
                      className={classes.img}
                      image={photoUrl}
                      alt="random"
                      onClick={() => {
                        handleModal();
                        setPhotoUrl(photoUrl);
                      }}
                    />
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </main>
      {/* Footer */}
      <Grid
        container
        justifyContent={"center"}
        sx={{ p: 5 }}
        component="footer"
      >
        <Pagination
          count={photos.photos.pages}
          color="primary"
          size="large"
          textColor="white"
          page={page}
          onChange={(e, selectedPage) => setPage(selectedPage)}
        />
      </Grid>
      {/* End footer */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    photos: state.photos,
  };
};

export default connect(mapStateToProps)(MainPage);
