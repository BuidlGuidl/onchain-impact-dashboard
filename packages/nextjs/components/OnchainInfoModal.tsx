import React from "react";
import Image from "next/image";

interface Props {
  isModalOpen: boolean;
  closeModal: () => void;
}
const OnchainInfoModal: React.FC<Props> = ({ isModalOpen, closeModal }) => {
  return (
    <>
      {isModalOpen && (
        <dialog id="my_modal_1" className="modal   bg-black/10 backdrop-blur-sm " open>
          <div className="modal-box max-w-md w-full px-6 pt-11">
            <div className="text-center">
              <h3 className="font-bold  sm:text-lg m-0">Select the information you want to share</h3>
              <p className="m-0 text-sm sm:text-base text-[#404454]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate.
              </p>
            </div>
            <div className="mt-4 p-6 border border-neutral-400/30 rounded-xl grid gap-3">
              <label className="inline-flex items-center" htmlFor="currentDate">
                <input id="currentDate" type="checkbox" className=" w-[18px] h-[18px]  accent-blue-600" />
                <span className="ml-4">Current date</span>
              </label>

              <label className="inline-flex items-center" htmlFor="selectedProject">
                <input id="selectedProject" type="checkbox" className=" w-[18px] h-[18px]  accent-blue-600" />
                <span className="ml-4">Selected project</span>
              </label>
              <label className="inline-flex items-center" htmlFor="otherDimention">
                <input id="otherDimention" type="checkbox" className=" w-[18px] h-[18px]  accent-blue-600" />
                <span className="ml-4">Other dimension</span>
              </label>
            </div>
            <div className="mt-4 flex items-center justify-center gap-6">
              <div className="cursor-pointer py-1 max-w-[72px] w-full px-4 border  border-neutral-400/30 rounded-xl">
                <Image src="/assets/svg/icons/farcaster.svg" width={40} height={40} alt="farcaster" />
              </div>
              <div className="cursor-pointer py-1 max-w-[72px] w-full px-4 border  border-neutral-400/30 rounded-xl">
                <Image src="/assets/svg/icons/twitter.svg" width={40} height={40} alt="farcaster" />
              </div>
              <div className="cursor-pointer py-1 max-w-[72px] w-full px-4 border  border-neutral-400/30 rounded-xl">
                <Image src="/assets/svg/icons/copy-link.svg" width={40} height={40} alt="farcaster" />
              </div>
            </div>
            <div className="modal-action">
              <button className="bg-OPred w-full py-3 font-medium text-white rounded-md" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default OnchainInfoModal;
