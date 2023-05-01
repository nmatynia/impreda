import React from 'react';
import { DialogModal } from '../dialog/DialogModal';
import { BodyText } from '../typography/Typography';

export const SizeChartDialog = ({
  isDialogOpen,
  handleCloseDialog
}: {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
}) => {
  return (
    <DialogModal
      title="Size Chart"
      isOpen={isDialogOpen}
      handleCloseDialog={handleCloseDialog}
      className="w-[calc(100vw-4rem)] max-w-3xl whitespace-nowrap"
    >
      <div className="grid grid-cols-4 p-8">
        <div className="col-span-1 flex flex-col border-r-[1px] border-primaryBlack">
          <BodyText className="mb-3 border-b-[1px] border-primaryBlack pb-3 text-center">
            Size
          </BodyText>
          <BodyText className="text-center">XS</BodyText>
          <BodyText className="text-center">S</BodyText>
          <BodyText className="text-center">M</BodyText>
          <BodyText className="text-center">L</BodyText>
          <BodyText className="text-center">XL</BodyText>
          <BodyText className="text-center">XXL</BodyText>
        </div>
        <div className="col-span-1 flex flex-col border-r-[1px] border-primaryBlack">
          <BodyText className="mb-3 border-b-[1px] border-primaryBlack pb-3 text-center">
            Chest
          </BodyText>
          <BodyText className="text-center">30-32&quot; </BodyText>
          <BodyText className="text-center">34-36&quot; </BodyText>
          <BodyText className="text-center">38-40&quot; </BodyText>
          <BodyText className="text-center">42-44&quot; </BodyText>
          <BodyText className="text-center">46-48&quot; </BodyText>
          <BodyText className="text-center">50-52&quot; </BodyText>
        </div>
        <div className="col-span-1 flex flex-col border-r-[1px] border-primaryBlack">
          <BodyText className="mb-3 border-b-[1px] border-primaryBlack pb-3 text-center">
            Waist
          </BodyText>
          <BodyText className="text-center">24-26&quot;</BodyText>
          <BodyText className="text-center">28-30&quot;</BodyText>
          <BodyText className="text-center">32-34&quot;</BodyText>
          <BodyText className="text-center">36-38&quot;</BodyText>
          <BodyText className="text-center">40-42&quot;</BodyText>
          <BodyText className="text-center">44-46&quot;</BodyText>
        </div>
        <div className="col-span-1 flex flex-col">
          <BodyText className="mb-3 border-b-[1px] border-primaryBlack pb-3 text-center">
            Hip
          </BodyText>
          <BodyText className="text-center">33-35&quot;</BodyText>
          <BodyText className="text-center">36-38&quot;</BodyText>
          <BodyText className="text-center">39-41&quot;</BodyText>
          <BodyText className="text-center">42-44&quot;</BodyText>
          <BodyText className="text-center">45-47&quot;</BodyText>
          <BodyText className="text-center">48-50&quot;</BodyText>
        </div>
      </div>
    </DialogModal>
  );
};
