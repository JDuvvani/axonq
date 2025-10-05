import { Router } from "express";
import {
  createClassMemberSchema,
  deleteConnectTokenSchema,
  deleteStudentSchema,
  generateConnectTokenSchema,
  getConnectTokensSchema,
  getClassMemberByIdSchema,
  updateClassMemberSchema,
} from "@axon/types";
import { validate } from "@middleware/validate.js";
import { classMemberController } from "./class-member.controller.js";

const router: Router = Router();

router.get("/", classMemberController.listMembers);

router.post(
  "/",
  validate(createClassMemberSchema),
  classMemberController.createMember
);

router.get(
  "/:id",
  validate(getClassMemberByIdSchema),
  classMemberController.getMemberById
);

router.put(
  "/:id",
  validate(updateClassMemberSchema),
  classMemberController.updateClassMember
);

router.delete(
  "/:id",
  validate(deleteStudentSchema),
  classMemberController.deleteMember
);

router.post(
  "/:id/token",
  validate(generateConnectTokenSchema),
  classMemberController.generateConnectToken
);

router.get(
  "/:id/token",
  validate(getConnectTokensSchema),
  classMemberController.getConnectTokens
);

router.delete(
  "/:id/token/:tokenId",
  validate(deleteConnectTokenSchema),
  classMemberController.deleteConnectToken
);

export const classMemberRoutes = router;
