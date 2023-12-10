import React, { useContext, useEffect, useState } from "react";
import RatingComponent from "./RatingComponent";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { pink, purple } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { getReviewsApi } from "../Service/commonApi";
import { GetHomeContext } from "../ContextShare/ContextRole";
import { Star } from "@mui/icons-material";

function ReviewTabl() {
  const { reviewFromResponse, setReviewFromResponse } =
    useContext(GetHomeContext);
  // to get review
  const getReview = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.error("Token is missing or undefined.");
      return;
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    console.log("Request Headers:", reqHeader); // Add this line to check headers

    try {
      const response = await getReviewsApi(reqHeader);
      setReviewFromResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getReview();
  }, []);
  return (
    <>
      <table className="ml-5 shadow  my-20">
        <thead className="border-b-2">
          <tr className="rounded-t-xl">
            <th className="pr-10 pl-10 py-4">#</th>
            <th className="pr-10 pl-10 py-4">Rating</th>
            <th className="pr-10 pl-10 py-4">Title</th>
            <th className="pr-10  py-4">Description</th>
            <th className="pr-10 pl-10 py-4">Suggestion</th>
          </tr>
        </thead>
        <tbody>
          {reviewFromResponse?.length > 0 ? (
            reviewFromResponse?.map((reviews, index) => {
              return (
                <tr key={reviews._id}  className=" hover:bg-gray-300 rounded-b-lg">
                  <td className="px-10 py-4 text-sm">{index + 1}</td>
                  <td className="px-10 py-4 text-sm">
                    {Array.from({ length: reviews.rating || 0 }, (_, index) => (
                      <span
                        key={index}
                        className="star text-xl me-3 text-yellow-400"
                      >
                        &#9733;
                      </span>
                    ))}
                  </td>
                  <td className="py-4 text-sm ">{reviews.title}</td>
                  <td className=" py-4 text-sm pr-5">
                    {reviews?.description
                      ? reviews.description.slice(0, 90)
                      : ""}
                    <span className="text-blue-700">... </span>
                  </td>
                  <td
                    className={` pl-5 py-4 text-sm ${
                      !reviews?.suggestion && "text-red-500"
                    }`}
                  >
                    {reviews?.suggestion
                      ? reviews.suggestion.slice(0, 90)
                      : "No suggestions"}
                    ...
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td></td>
              <td></td>
              <td className="mt-2 text-red-500">No Review</td>
              <td></td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default ReviewTabl;
