# Liquidated Ascertained Damages (LAD) Calculator

This web application helps homebuyers and property owners calculate the estimated compensation for delays in the delivery of their property and common facilities.

## Disclaimer

**Please note that this calculator is for informational purposes only and is not an official tool. The results provided are estimates and may not reflect the actual compensation you are entitled to. For official calculations and legal advice, please consult your lawyer or relevant authorities.**

## Features

- **SPA Date and Purchase Amount Caching**: Automatically saves the SPA date and purchase amount to local storage for convenience.
- **Customizable Dates**: Allows users to input and adjust the SPA signed date, purchase amount, and estimated VP date.
- **MCO Period Offset**: Includes an option to account for the Movement Control Order (MCO) period, which affects the calculation of delays.
- **Detailed Breakdown**: Provides a detailed breakdown of LAD amounts for unit and common facilities, as well as a total LAD amount.
- **Clear Data**: A convenient button to reset and clear cached SPA date and purchase amount.

## How It Works

The LAD Calculator uses the following formulas to calculate the LAD amounts:

1. **Unit LAD Amount**:

   Unit LAD Amount = (10% * Purchase Price * Days of Delay) / 365


2. **Common Facilities LAD Amount**:

   Common Facilities LAD Amount = (20% * Purchase Price * 10% * Days of Delay) / 365


3. **Total LAD Amount**:

   Total LAD Amount = Unit LAD Amount + Common Facilities LAD Amount


## How to Use

1. **Enter SPA Signed Date**: Input the date when the Sales and Purchase Agreement was signed.
2. **Enter Purchase Price**: Input the purchase price of the property.
3. **Enter Estimated VP Date**: Input the estimated Vacant Possession (VP) date.
4. **Offset MCO Period**: Check the box to offset the MCO period if applicable.
5. **View Results**: The calculator will display the estimated LAD amounts for both unit and common facilities.

## Technology Used

- **Vue.js**: A progressive JavaScript framework for building user interfaces.
- **Moment.js**: A JavaScript library for parsing, validating, manipulating, and formatting dates.
- **HTML/CSS**: For structuring and styling the web page.

## Conclusion
The LAD Calculator is a user-friendly tool designed to assist homebuyers in calculating the compensation they are entitled to for delays in property delivery. By entering key information, users can quickly get an estimate of the LAD amounts, helping them understand their rights and potential claims.

Disclaimer: This calculator is for informational purposes only and is not an official tool. The results provided are estimates and may not reflect the actual compensation you are entitled to. For official calculations and legal advice, please consult your lawyer or relevant authorities.