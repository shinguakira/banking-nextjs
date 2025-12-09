"use server";

import { mockCreateTransfer } from "../providers/mock-transaction";

// Create a Dwolla Funding Source using a Plaid Processor Token
export const createFundingSource = async (
  options: CreateFundingSourceOptions
) => {
  // Mock implementation - options would be used with real Dwolla API
  console.log('Mock funding source created for:', options.fundingSourceName);
  // Return a mock funding source URL
  return `https://api-sandbox.dwolla.com/funding-sources/mock-${Date.now()}`;
};

export const createOnDemandAuthorization = async () => {
  // Return mock auth links
  return {
    self: { href: "https://api-sandbox.dwolla.com/on-demand-authorizations/mock" },
  };
};

export const createDwollaCustomer = async (
  newCustomer: NewDwollaCustomerParams
) => {
  // Mock implementation - newCustomer would be used with real Dwolla API
  console.log('Mock customer created for:', newCustomer.email);
  // Return a mock customer URL
  return `https://api-sandbox.dwolla.com/customers/mock-${Date.now()}`;
};

export const createTransfer = async (params: TransferParams) => {
  // Mock implementation - params would be used with real Dwolla API
  console.log('Mock transfer created for amount:', params.amount);
  return mockCreateTransfer();
};

export const addFundingSource = async ({
  dwollaCustomerId,
  processorToken,
  bankName,
}: AddFundingSourceParams) => {
  // create dwolla auth link
  const dwollaAuthLinks = await createOnDemandAuthorization();

  // add funding source to the dwolla customer & get the funding source url
  const fundingSourceOptions = {
    customerId: dwollaCustomerId,
    fundingSourceName: bankName,
    plaidToken: processorToken,
    _links: dwollaAuthLinks,
  };
  return await createFundingSource(fundingSourceOptions);
};