import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import API from "@/api";
import { InputConstructor } from "@/containers/Authorization/components/DialogLogin";
import {
      createGuildAction,
      joinGuildAction,
} from "@/containers/GuildsList/guildsActions";
import UploadIcon from "@/icons/UploadIcon";
import { useAppDispatch, useAppSelector } from "@/store";
import { storeSelector } from "@/store/storeSelector";

import Button from "../Button/Button";
import Typography from "../Typography/Typography";

import { DialogContent, DialogHeader } from "./Dialog";
import { DialogButtonsWrapper, Dialog } from "./DialogWrapper";

import type { ChangeEventHandler, MouseEventHandler } from "react";

const { getProfileLogin } = storeSelector;

const UploadAvatarWrapper = styled.div`
      filter: saturate(1);
      color: #4e5058;
      display: flex;
      justify-content: center;
      margin-top: 24px;
`;
const AvatarButton = styled.div`
      cursor: pointer;
      width: 80px;
      height: 80px;
`;
const Avatar = styled.img`
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
`;

export function DialogCreateServer({ onClose }: { onClose: () => void }) {
      const { t } = useTranslation();

      const dispatch = useAppDispatch();

      const login = useAppSelector(getProfileLogin);
      const [avatar, setAvatar] = useState<File | undefined>(undefined);
      const values = useRef({
            name: t("dialog.default_server_name", {
                  users: login,
            }),
      });

      const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
            const value = e.target.value;
            values.current.name = value;
      };
      const handleUploadClick: MouseEventHandler<HTMLImageElement> = (e) => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/png, image/jpeg, image/jpg, image/gif";
            input.click();
            input.onchange = (e) => {
                  const element = e.target as HTMLInputElement;
                  const file = element.files?.item(0);
                  if (file) setAvatar(file);
            };
      };

      const handleSubmit = async () => {
            const icon = avatar
                  ? await API.upload().uploadAvatar({ file: avatar })
                  : undefined;

            dispatch(
                  createGuildAction({
                        ...values.current,
                        avatar: icon?.filename ?? "",
                  })
            ).then(onClose);
      };

      return (
            <>
                  <Dialog sx={{ backgroundColor: "var(--modal-background)" }}>
                        <DialogHeader
                              sx={{
                                    justifyContent: "center",
                              }}
                        >
                              <Typography
                                    sx={{
                                          textAlign: "center",
                                          color: "var(--primary-860)",
                                          mb: 1,
                                    }}
                                    asBlock
                                    fontSize="24px"
                                    fontWeight={700}
                              >
                                    {t("dialog.create_server_header")}
                              </Typography>
                        </DialogHeader>
                        <DialogContent>
                              <Typography
                                    sx={{
                                          textAlign: "center",
                                          color: "var(--header-secondary)",
                                          mt: 1,
                                    }}
                                    asBlock
                                    fontSize="16px"
                              >
                                    {t("dialog.create_server_subtitle")}
                              </Typography>
                              <UploadAvatarWrapper>
                                    <AvatarButton onClick={handleUploadClick}>
                                          {avatar ? (
                                                <Avatar
                                                      src={URL.createObjectURL(
                                                            avatar
                                                      )}
                                                />
                                          ) : (
                                                <UploadIcon />
                                          )}
                                    </AvatarButton>
                              </UploadAvatarWrapper>
                              <InputConstructor
                                    text={t("dialog.input.server_name")}
                                    name={""}
                                    type={""}
                                    defaultValue={values.current.name}
                                    onChange={handleChange}
                                    description={
                                          <Typography
                                                color="--text-muted"
                                                fontSize="12px"
                                          >
                                                {t(
                                                      "dialog.creating_server_description"
                                                )}{" "}
                                                <Typography
                                                      fontSize="12px"
                                                      fontWeight={600}
                                                      color="--blue-bg"
                                                >
                                                      {t(
                                                            "dialog.link_creating_server_description"
                                                      )}
                                                </Typography>
                                          </Typography>
                                    }
                              />
                        </DialogContent>

                        <DialogButtonsWrapper>
                              <Button onClick={handleSubmit}>
                                    {t("button.create")}
                              </Button>
                        </DialogButtonsWrapper>
                  </Dialog>
            </>
      );
}
export function DialogJoinServer({ onClose }: { onClose: () => void }) {
      const { t } = useTranslation();
      const login = useAppSelector(getProfileLogin);
      const dispatch = useAppDispatch();
      const values = useRef({
            code: "",
      });

      const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
            const value = e.target.value;
            values.current.code = value;
      };
      const handleSubmit = () => {
            dispatch(joinGuildAction(values.current.code)).then(onClose);
      };
      return (
            <>
                  <Dialog sx={{ backgroundColor: "var(--modal-background)" }}>
                        <DialogHeader
                              sx={{
                                    justifyContent: "center",
                              }}
                        >
                              <Typography
                                    sx={{
                                          textAlign: "center",
                                          color: "var(--primary-860)",
                                          mb: 1,
                                    }}
                                    asBlock
                                    fontSize="24px"
                                    fontWeight={700}
                              >
                                    {t("dialog.join_server_header")}
                              </Typography>
                        </DialogHeader>
                        <DialogContent>
                              <Typography
                                    sx={{
                                          textAlign: "center",
                                          color: "var(--header-secondary)",
                                          mt: 1,
                                    }}
                                    asBlock
                                    fontSize="16px"
                              >
                                    {t("dialog.join_server_subtitle")}
                              </Typography>
                              <InputConstructor
                                    text={t("dialog.input.server_name")}
                                    name={""}
                                    type={""}
                                    defaultValue={`${login}'s server`}
                                    onChange={handleChange}
                                    description={
                                          <Typography
                                                color="--text-muted"
                                                fontSize="12px"
                                          >
                                                By creating a server, you agree
                                                to Discord's{" "}
                                                <Typography
                                                      fontSize="12px"
                                                      fontWeight={600}
                                                      color="--blue-bg"
                                                >
                                                      Community Guidelines
                                                </Typography>
                                          </Typography>
                                    }
                              />
                        </DialogContent>

                        <DialogButtonsWrapper>
                              <Button onClick={handleSubmit}>Join</Button>
                        </DialogButtonsWrapper>
                  </Dialog>
            </>
      );
}
const BigButtons = styled.div`
      align-items: center;
      cursor: pointer;
      height: 66px;
      padding: 0;
      display: flex;
      border-radius: 8px;
      margin-bottom: 8px;
      border: 1px solid var(--background-modifier-accent);
      background-color: var(--background-primary);
      & svg {
            margin: 8px 8px 8px 16px;
      }
`;
const CreateOwnServer = () => {
      return (
            <svg
                  fill="none"
                  height="48"
                  viewBox="0 0 48 48"
                  width="48"
                  xmlns="http://www.w3.org/2000/svg"
            >
                  <linearGradient
                        id="a"
                        gradientUnits="userSpaceOnUse"
                        x1="33.3571"
                        x2="27.2776"
                        y1="29.2359"
                        y2="35.3106"
                  >
                        <stop offset="0" stop-color="#dae1ea" />
                        <stop offset="1" stop-color="#becbd8" />
                  </linearGradient>
                  <path
                        d="m23.5 41.9961c9.665 0 17.5-7.8341 17.5-17.498 0-9.664-7.835-17.4981-17.5-17.4981s-17.5 7.8341-17.5 17.4981c0 9.6639 7.835 17.498 17.5 17.498z"
                        fill="#718ef7"
                  />
                  <g fill="#f7e080">
                        <path d="m31.5237 16.8877-3.1046-3.1043-1.9176 1.9174 3.1046 3.1043z" />
                        <path d="m31.5252 16.8838-3.1047-3.1043 2.0823-.1452 1.1676 1.1674z" />
                        <path d="m28.7918 9.9113c.318.00133.6284.0965.8925.2736.264.1771.4699.4283.5917.7219.1219.2937.1543.6167.0932.9287-.0612.312-.2131.599-.4367.825-.306.2851-.7107.4403-1.1289.4329-.4182-.0073-.8172-.1767-1.1129-.4724-.2958-.2958-.4652-.6947-.4726-1.1128-.0073-.4182.1479-.8229.433-1.1288.3033-.3008.7135-.46915 1.1407-.4681zm0-2.04442c-.8464-.00082-1.6668.29177-2.3217.82794-.6548.53618-1.1035 1.28277-1.2696 2.11258-.166.8298-.0393 1.6916.3588 2.4384.398.7469 1.0427 1.3327 1.8242 1.6576s1.6515.3688 2.4618.1244c.8103-.2445 1.5107-.7623 1.982-1.4653.4713-.7029.6843-1.5475.6028-2.3898-.0816-.8424-.4527-1.63036-1.0502-2.22981-.3391-.34111-.7424-.61178-1.1866-.79645-.4441-.18467-.9204-.27967-1.4015-.27956z" />
                        <path d="m33.8012 14.9201c.428.0004.8383.1707 1.1407.4734.2639.2643.4281.6118.4644.9835.0364.3716-.0573.7444-.265 1.0547-.2077.3104-.5166.5391-.874.6473-.3575.1081-.7414.089-1.0864-.0542-.3449-.1432-.6295-.4015-.8053-.731-.1758-.3294-.2319-.7097-.1587-1.0759.0731-.3661.271-.6956.5599-.9323s.6509-.3658 1.0244-.3655zm0-2.0444c-.8464-.0008-1.6668.2918-2.3217.8279-.6548.5362-1.1035 1.2828-1.2696 2.1126-.166.8298-.0393 1.6916.3588 2.4384.398.7469 1.0427 1.3327 1.8242 1.6576s1.6515.3688 2.4618.1244c.8103-.2445 1.5107-.7623 1.982-1.4653.4713-.7029.6843-1.5475.6027-2.3898-.0815-.8424-.4527-1.6304-1.0501-2.2298-.3384-.3421-.7415-.6134-1.1859-.7981-.4443-.1848-.921-.2792-1.4022-.2779z" />
                        <path d="m35.6468 8.04442c.4279.00038.8383.17068 1.1407.47345.2236.22599.3755.51299.4366.82497.0611.31199.0287.63508-.0931.92876-.1218.2936-.3277.5447-.5917.7219-.2641.1771-.5746.2722-.8925.2736-.318-.0014-.6284-.0965-.8925-.2736-.264-.1772-.4699-.4283-.5917-.7219-.1219-.29368-.1543-.61677-.0932-.92876.0612-.31198.2131-.59898.4367-.82497.3024-.30277.7127-.47307 1.1407-.47345zm0-2.04442c-.492-.01887-.9826.06172-1.4427.23693-.46.17522-.88.44146-1.2347.78279s-.6369.75072-.8297 1.20367c-.1927.45294-.292.94012-.292 1.43236 0 .49225.0993.97945.292 1.43235.1928.453.475.8624.8297 1.2037s.7747.6076 1.2347.7828c.4601.1752.9507.2558 1.4427.2369.7212-.0028 1.4256-.2187 2.0245-.6206.5989-.4018 1.0656-.9717 1.3416-1.638s.3489-1.39925.2095-2.10683-.4848-1.35818-.9929-1.87005c-.3378-.34143-.74-.61237-1.1834-.79708-.4434-.18472-.919-.27953-1.3993-.27894z" />
                  </g>
                  <path
                        d="m33.0385 29.525-5.8136 5.8129c-.9859.9857-2.323 1.5395-3.7172 1.5395s-2.7313-.5538-3.7172-1.5395l-3.8656-3.8651 13.6475-13.646 3.4661 3.4657c1.0918 1.0917 1.7052 2.5724 1.7052 4.1163 0 1.5438-.6134 3.0245-1.7052 4.1162z"
                        fill="#ebf0f7"
                  />
                  <path
                        d="m22.1952 23.9532 5.5206-.9469-.1023 1.4365c-.1994 1.9527.049 3.9252.7264 5.7674.3431.8492.4286 1.7805.2459 2.678-.1828.8974-.6257 1.7211-1.2736 2.3685l-.5058.538c-.8746.873-2.0598 1.3632-3.2956 1.3632s-2.421-.4902-3.2957-1.3632l-4.9125-4.9173z"
                        fill="#b2c1d1"
                  />
                  <path
                        d="m29.5936 18.8045-3.0939-3.1204-20.16132 20.1752 2.88941 2.8891c.05738.0565.13469.0882.21523.0882s.15784-.0317.21522-.0882z"
                        fill="#f7e080"
                  />
                  <path
                        d="m12.6607 30.6998-5.74121 5.7405-5.58511-5.5845c-.08313-.0836-.12979-.1968-.12979-.3147s.04666-.2311.12979-.3147l1.44201-1.4419c.10022-.1025.21991-.1839.35204-.2395s.27404-.0842.41739-.0842c.14336 0 .28526.0286.4174.0842.13213.0556.25182.137.35204.2395l.13451.1291c.13108.1428.22475.3158.27264.5035.04788.1878.04849.3845.00178.5726-.0847.4067-.03486.8299.14201 1.2058.17686.3759.47116.6841.83851.8781.36736.1941.78785.2634 1.19808.1976.41022-.0657.78794-.2631 1.07619-.5623.28824-.2991.4714-.6839.52184-1.0963.05044-.4123-.03457-.8299-.24221-1.1897-.20763-.3598-.52664-.6424-.90892-.8051-.38227-.1627-.80709-.1967-1.21039-.0969-.16508.0485-.34002.0526-.50722.012-.16719-.0406-.32073-.1245-.44516-.2433l-.29593-.2959c-.17579-.1765-.27449-.4154-.27449-.6645 0-.249.0987-.488.27449-.6644l1.56577-1.5495c.04097-.041.08962-.0735.14317-.0957s.11094-.0336.1689-.0336c.05797 0 .11536.0114.16891.0336s.1022.0547.14317.0957z"
                        fill="#f7e080"
                  />
                  <path
                        d="m11.1759 37.2353-3.10461-3.1043-.59353.5934 3.10464 3.1043z"
                        fill="#f5b312"
                  />
                  <path
                        d="m16.4287 31.98-3.1046-3.1043-1.2479 1.2478 3.1046 3.1043z"
                        fill="#f5b312"
                  />
                  <path
                        d="m26.9811 24.7889.0038-.0038c.9792-.9791.9792-2.5665 0-3.5456l-3.7438-3.7434c-.9792-.979-2.5668-.979-3.546 0l-.0038.0038c-.9792.9791-.9792 2.5665 0 3.5456l3.7439 3.7434c.9792.9791 2.5667.9791 3.5459 0z"
                        fill="#cbd5e0"
                  />
                  <path
                        d="m23.4337 28.3415.0038-.0038c.9792-.9791.9792-2.5665 0-3.5455l-3.7439-3.7435c-.9792-.979-2.5667-.979-3.5459 0l-.0038.0038c-.9792.9791-.9792 2.5665 0 3.5456l3.7438 3.7434c.9792.9791 2.5668.9791 3.546 0z"
                        fill="#cbd5e0"
                  />
                  <path
                        d="m19.8841 31.8887.0038-.0038c.9792-.9791.9792-2.5665 0-3.5456l-3.7438-3.7434c-.9792-.9791-2.5668-.9791-3.546 0l-.0038.0038c-.9792.9791-.9792 2.5665 0 3.5456l3.7438 3.7434c.9792.9791 2.5668.9791 3.546 0z"
                        fill="#cbd5e0"
                  />
                  <path
                        d="m30.3684 19.6599v-.0053c0-1.3847-1.1226-2.5071-2.5074-2.5071h-4.3798c-1.3848 0-2.5074 1.1224-2.5074 2.5071v.0053c0 1.3847 1.1226 2.5071 2.5074 2.5071h4.3798c1.3848 0 2.5074-1.1224 2.5074-2.5071z"
                        fill="#ebf0f7"
                  />
                  <path
                        d="m25.6423 37.7917 9.6335-9.6324-.8447-.8445-9.6335 9.6324z"
                        fill="url(#a)"
                  />
                  <path
                        d="m27.178 39.3244 9.5383-9.5373c.498-.4979.4989-1.3044.0019-1.8013-.4969-.4969-1.3035-.4961-1.8015.0019l-9.5384 9.5373c-.498.4979-.4988 1.3044-.0019 1.8013.497.4969 1.3035.4961 1.8016-.0019z"
                        fill="#ebf0f7"
                  />
                  <path
                        d="m42.0605 12.9779c0-.1842-.1482-.3336-.3309-.3336-.1828 0-.3309.1494-.3309.3336v.3282c0 .1842.1481.3336.3309.3336.1827 0 .3309-.1494.3309-.3336z"
                        fill="#f7d036"
                  />
                  <path
                        d="m42.0605 15.6303c0-.1842-.1482-.3335-.3309-.3335-.1828 0-.3309.1493-.3309.3335v.3282c0 .1842.1481.3336.3309.3336.1827 0 .3309-.1494.3309-.3336z"
                        fill="#f7d036"
                  />
                  <path
                        d="m43.2174 14.8018c.1843 0 .3336-.1482.3336-.3309s-.1493-.3309-.3336-.3309h-.3282c-.1842 0-.3336.1482-.3336.3309s.1494.3309.3336.3309z"
                        fill="#f7d036"
                  />
                  <path
                        d="m40.5647 14.8018c.1843 0 .3336-.1482.3336-.3309s-.1493-.3309-.3336-.3309h-.3282c-.1842 0-.3336.1482-.3336.3309s.1494.3309.3336.3309z"
                        fill="#f7d036"
                  />
                  <path
                        d="m43.3735 33.024c0-.2407-.1939-.4358-.4332-.4358-.2392 0-.4331.1951-.4331.4358v.4304c0 .2407.1939.4358.4331.4358.2393 0 .4332-.1951.4332-.4358z"
                        fill="#f47fff"
                  />
                  <path
                        d="m43.3735 36.4941c0-.2406-.1939-.4358-.4332-.4358-.2392 0-.4331.1952-.4331.4358v.4304c0 .2407.1939.4358.4331.4358.2393 0 .4332-.1951.4332-.4358z"
                        fill="#f47fff"
                  />
                  <path
                        d="m44.8907 35.402c.2407 0 .4358-.1939.4358-.4331s-.1951-.4331-.4358-.4331h-.4305c-.2407 0-.4358.1939-.4358.4331s.1951.4331.4358.4331z"
                        fill="#f47fff"
                  />
                  <path
                        d="m41.4256 35.4074c.2407 0 .4359-.1939.4359-.4331s-.1952-.4331-.4359-.4331h-.4304c-.2407 0-.4359.1939-.4359.4331s.1952.4331.4359.4331z"
                        fill="#f47fff"
                  />
                  <path
                        d="m3.73413 17.0237-.53806 1.146c-.02989.0587-.04043.1253-.03011.1904s.04097.1252.08756.1718c.04658.0466.10672.0772.17179.0875s.13174-.0002.19045-.0301l1.14608-.538c.04338-.0185.09005-.028.13721-.028.04715 0 .09382.0095.1372.028l1.14608.538c.05871.0299.12538.0404.19045.0301s.12521-.0409.1718-.0875c.04658-.0466.07723-.1067.08755-.1718s-.00022-.1317-.03011-.1904l-.53806-1.146c-.0185-.0434-.02804-.09-.02804-.1372 0-.0471.00954-.0938.02804-.1372l.53806-1.1459c.02989-.0587.04043-.1254.03011-.1905-.01032-.065-.04097-.1251-.08755-.1717-.04659-.0466-.10673-.0773-.1718-.0876s-.13174.0003-.19045.0301l-1.14608.538c-.0426.0213-.08957.0324-.1372.0324-.04764 0-.09461-.0111-.13721-.0324l-1.14608-.538c-.05871-.0298-.12538-.0404-.19045-.0301s-.12521.041-.17179.0876c-.04659.0466-.07724.1067-.08756.1717-.01032.0651.00022.1318.03011.1905l.53806 1.1459c.0185.0434.02804.0901.02804.1372 0 .0472-.00954.0938-.02804.1372z"
                        fill="#60cfac"
                  />
            </svg>
      );
};
export function DialogAddServer(props: { onClose: () => void }) {
      const { onClose } = props;
      const { t } = useTranslation();
      const [dialogType, setDialogType] = useState<
            "create" | "join" | undefined
      >(undefined);

      switch (dialogType) {
            case "create":
                  return <DialogCreateServer onClose={onClose} />;
            case "join":
                  return <DialogJoinServer onClose={onClose} />;

            default:
                  return (
                        <Dialog
                              sx={{
                                    backgroundColor: "var(--modal-background)",
                                    maxWidth: "440px",
                              }}
                        >
                              <DialogHeader
                                    sx={{
                                          justifyContent: "center",
                                          flexDirection: "column",
                                    }}
                              >
                                    <Typography
                                          sx={{
                                                textAlign: "center",
                                                color: "var(--header-primary)",
                                                mt: 1,
                                          }}
                                          fontSize="24px"
                                          fontWeight={700}
                                          asBlock
                                    >
                                          {t("dialog.create_a_sever")}
                                    </Typography>
                                    <Typography
                                          asBlock
                                          sx={{
                                                textAlign: "center",
                                                color: "var(--header-secondary)",
                                                mt: 1,
                                          }}
                                    >
                                          {t(
                                                "dialog.create_a_sever_description"
                                          )}
                                    </Typography>
                              </DialogHeader>
                              <DialogContent>
                                    <BigButtons
                                          onClick={function () {
                                                setDialogType("create");
                                          }}
                                    >
                                          <CreateOwnServer />
                                          <Typography
                                                asBlock
                                                sx={{
                                                      textAlign: "center",
                                                      color: "var(--header-secondary)",
                                                      mb: 1,
                                                }}
                                                fontWeight={600}
                                          >
                                                Create My Own
                                          </Typography>
                                    </BigButtons>
                              </DialogContent>
                              <DialogButtonsWrapper
                                    sx={{
                                          flexDirection: "column",
                                    }}
                              >
                                    <Typography
                                          asBlock
                                          sx={{
                                                textAlign: "center",
                                                color: "var(--header-secondary)",
                                                mb: 1,
                                          }}
                                          fontWeight={600}
                                          fontSize="20px"
                                    >
                                          {t("dialog.have_invite_already")}
                                    </Typography>
                                    <Button
                                          variant="secondary"
                                          onClick={function () {
                                                setDialogType("join");
                                          }}
                                    >
                                          {t("dialog.join_a_server")}
                                    </Button>
                              </DialogButtonsWrapper>
                        </Dialog>
                  );
      }
}
