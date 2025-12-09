"use server";

import { mockCreateTransfer } from "../providers/mock-transaction";

// Create a Dwolla Funding Source using a Plaid Processor Token
export const createFundingSource = async (
  _options: CreateFundingSourceOptions
) => {
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
  _newCustomer: NewDwollaCustomerParams
) => {
  // Return a mock customer URL
  return `https://api-sandbox.dwolla.com/customers/mock-${Date.now()}`;
};

export const createTransfer = async (_params: TransferParams) => {
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