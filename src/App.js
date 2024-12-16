// Import necessary modules
import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
  Container,
  Box,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Categories Mock Data
const categories = [
  { id: 1, name: "Latest Deals", url: "https://cdn.pixelbin.io/v2/jmd-asp/jmd-np/wrkr/jiox0/company/1/applications/62a6e359d83a8b6a324f1d83/theme/pictures/free/original/theme-image-1674115394481.png" },
  { id: 2, name: "Mobiles & Tablets", url: "https://cdn.pixelbin.io/v2/jmd-asp/jmd-np/wrkr/jiox0/company/1/applications/62a6e359d83a8b6a324f1d83/theme/pictures/free/original/theme-image-1673600916284.png" },
  { id: 3, name: "Headphones", url: "https://cdn.pixelbin.io/v2/jmd-asp/jmd-np/wrkr/jiox0/company/1/applications/62a6e359d83a8b6a324f1d83/theme/pictures/free/original/theme-image-1693285860194.png" },
  { id: 4, name: "TV Speakers & Soundbars", url: "https://cdn.pixelbin.io/v2/jmd-asp/jmd-np/wrkr/jiox0/company/1/applications/62a6e359d83a8b6a324f1d83/theme/pictures/free/original/theme-image-1703661046891.jpeg" },
  { id: 5, name: "Power Banks", url: "https://cdn.pixelbin.io/v2/jmd-asp/jmd-np/wrkr/jiox0/company/1/applications/62a6e359d83a8b6a324f1d83/theme/pictures/free/original/theme-image-1703661046891.jpeg" },
  { id: 6, name: "Pendrives", url: "https://cdn.pixelbin.io/v2/jmd-asp/jmd-np/wrkr/jiox0/products/pictures/item/free/original/128/491667140/0/0zaXs5CuQE-sandisk-sdddc3-064g-i35-pen-drive-491667140-i-1-1200wx1200h.jpeg" },
  { id: 7, name: "Speakers", url: "https://cdn.pixelbin.io/v2/jmd-asp/jmd-np/wrkr/jiox0/products/pictures/item/free/original/8/491630510/0/uNlrvI9bsc-google-ga00781-in-smart-display-and-speakers-491630510-i-1-1200wx1200h.jpeg" },
];

const EcommerceApp = () => {
  const [searchInput, setSearchInput] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch results from the API based on the image URL
  const handleReverseImageSearch = async () => {
    console.log("Image URL ", {imageURL})
    if (!imageURL) return;
    setLoading(true);
    try {
      const response = await fetch(
        `http://0.0.0.0:8001/api/images/search/?query=${encodeURIComponent(imageURL)}`
      );
      const data = await response.json();
      const metadatas = data?.result?.metadatas[0]|| [];
      setResults(metadatas);
    } catch (error) {
      console.error("Error fetching reverse image search results:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* Top Navigation */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <img
                  src= "https://cdn.pixelbin.io/v2/jmd-asp/jmd-np/wrkr/jiox0/organization/60b49b9eed2e1f198bc265f3/theme/assets/jio-logo.8fa908bc449956f64d30f85fbd25f5c0.svg"
                  style={{ width: "50px", borderRadius: "50%" }}
                />
          </Typography>
          <TextField
            placeholder="Search for Products, Brands..."
            variant="outlined"
            size="small"
            sx={{ backgroundColor: "white", borderRadius: 1 }}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Categories Section */}
      <Container sx={{ mt: 2, mb: 3 }}>
        <Grid container justifyContent="center" spacing={3}>
          {categories.map((category) => (
            <Grid item key={category.id} xs={4} sm={3} md={1.5}>
              <Box textAlign="center">
                <img
                  src={category.url}
                  alt={category.name}
                  style={{ width: "80px", borderRadius: "50%" }}
                />
                <Typography variant="body2" mt={1}>
                  {category.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Reverse Image Search Section */}
      <Container sx={{ mb: 5 }}>
        <Typography variant="h5" mb={2}>
          Reverse Image Search
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8} sm={10}>
            <TextField
              fullWidth
              placeholder="Enter Image URL"
              variant="outlined"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
          </Grid>
          <Grid item xs={4} sm={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleReverseImageSearch}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </Grid>
        </Grid>
      </Container>

      {/* Display Results */}
      <Container>
        {results.length > 0 ? (
          <>
            <Typography variant="h5" mb={3}>
              Search Results
            </Typography>
            <Grid container spacing={3}>
              {results.map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card>
                    {item.url && (
                      <CardMedia
                        component="img"
                        alt={item.name}
                        height="150"
                        image={item.url}
                      />
                    )}
                    <CardContent>
                      <Typography variant="h6">
                        {item.name || "No Name Provided"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        ) : loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Typography>No results to display. Enter an image URL to search.</Typography>
        )}
      </Container>
    </Box>
  );
};

export default EcommerceApp;
