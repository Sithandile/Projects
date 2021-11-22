<template>
    <section class="ui three right float column grid" style="position: absolute;z-index:1">
      <div class="column">
        <form class="ui segment large form">
          <div class="ui message red" v-show="error">{{error}}</div>
          <div class="ui segment">
            <div class="field">
              <div class="ui right icon input large" :class="{loading:spinner}">
                <input
                  type="text"
                  placeholder="Enter your address"
                  v-model="address"
                />
                <i class="dot circle link icon" @click="locatorButtonPressed"></i>
              </div>
            </div>
            <button class="ui button">Go</button>
          </div>
        <div class="field">
          <div class="two fields">
            <div class="field">
              <select v-model="type">
                  <option value="supermarket">Supermarket</option>
              </select>
            </div>

            <div class="field">
                <select v-model="radius">
                  <option value="5">5 km</option>
                  <option value="10">10 km</option>
                  <option value="15">15 km</option>
                  <option value="20">20 km</option>
                </select>
            </div>
          </div>
        </div>
        <button class="ui button grey" @click="findCloseByButtonPressed">Locate</button>
        </form>
      <div class="ui segment" style="max-height: 400px; overflow: scroll">
            <div class="ui divided items">
                <div class="item" v-for="place in places" :key="place.id">
                    <div class="content">
                        <div class="header">{{place.name}}</div>
                        <div class="meta">{{place.vicinity}}</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      address: "",
      error: "",
      spinner: false,
    };
  },

  methods: {
    locatorButtonPressed() {
      this.spinner = true;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.getAddressFrom(
              position.coords.latitude,
              position.coords.longitude
            );
          },
          (error) => {
            this.error =
              "Locator is unable to find your address. Please type your address manually.";
            this.spinner = false;
            // console.log(error.message);
          }
        );
      } else {
        this.error = error.message;
        this.spinner = false;
        console.log("Your browser does not support geolocation API ");
      }
    },
    getAddressFrom(lat, long) {
      axios
        .get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            "," +
            long +
            "&key=[API-Key]")
        .then((response) => {
          if (response.data.error_message) {
            this.error = response.data.error_message;
            console.log(response.data.error_message);
          } else {
            this.address = response.data.results[0].formatted_address;
            // console.log(response.data.results[0].formatted_address);
          }
          this.spinner = false;
        })
        .catch((error) => {
          this.error = error.message;
          this.spinner = false;
          console.log(error.message);
        });
    },
    findCloseByButtonPressed () {
      const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
        this.lat
      },${this.lng}&type=${this.type}&radius=${this.radius *
                     1000}&key=[API-Key]`
      axios
        .get(URL)
        .then(response => {
          this.places = response.data.results
        })
        .catch(error => {
          console.log(error.message)
        })
    }
  }
};
</script>

<style>
.ui.button,
.dot.circle.icon {
  background-color:grey;
  color: white;
}

.pac-icon {
  display: none;
}

.pac-item {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}

.pac-item:hover {
  background-color: #ececec;
}

.pac-item-query {
  font-size: 16px;
}

.ui.grid {
  right: 0;
  top: 0;
  margin: 40px auto;
  height: 40px;
}

.field {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
