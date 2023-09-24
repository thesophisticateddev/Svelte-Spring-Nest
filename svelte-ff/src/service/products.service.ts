import {type AxiosResponse} from "axios";
import { getToken } from "../lib/auth";
import ApiClient from "../lib/api.client";
import { writable } from "svelte/store"; // Import writable from Svelte

export interface IProduct {
  id: string;
  email: string;
}

// Create a writable store for the product data
export const productData = writable<IProduct | null>(null);

class ProductService {
  constructor() {
    this.getData(); // Call getData method in the constructor
  }

  private async getData(): Promise<void> {
    try {
      console.log("Sending request to spring boot");
      const response = await ApiClient.get<IProduct>("http://localhost:5000/");
      const data = response.data;
      console.log("Here is the data fetched", data);

      // Update the productData store with the fetched data
      productData.set(data);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}

export default ProductService;