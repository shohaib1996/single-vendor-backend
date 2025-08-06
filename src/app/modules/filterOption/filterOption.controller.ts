import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { FilterOptionService } from "./filterOption.services";

const createFilterOption = catchAsync(async (req: Request, res: Response) => {
  const result = await FilterOptionService.createFilterOption(req.body);
  if ("count" in result) {
    res
      .status(201)
      .json({ success: true, message: `${result.count} filter options created successfully` });
  } else {
    res.status(201).json({ success: true, data: result });
  }
});

const getFilterOptions = catchAsync(async (req: Request, res: Response) => {
  const result = await FilterOptionService.getFilterOptions(req.query);
  res.status(200).json({ success: true, ...result });
});

const getFilterOption = catchAsync(async (req: Request, res: Response) => {
  const result = await FilterOptionService.getFilterOption(req.params.id);
  res.status(200).json({ success: true, data: result });
});

const updateFilterOption = catchAsync(async (req: Request, res: Response) => {
  const result = await FilterOptionService.updateFilterOption(req.params.id, req.body);
  res.status(200).json({ success: true, data: result });
});

const deleteFilterOption = catchAsync(async (req: Request, res: Response) => {
  await FilterOptionService.deleteFilterOption(req.params.id);
  res.status(200).json({ success: true, message: "Filter option deleted" });
});

export const FilterOptionController = {
  createFilterOption,
  getFilterOptions,
  getFilterOption,
  updateFilterOption,
  deleteFilterOption,
};
