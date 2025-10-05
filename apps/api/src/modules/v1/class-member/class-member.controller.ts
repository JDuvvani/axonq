/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { ValidatedRequest } from "@middleware/validate.js";
import {
  createClassMemberSchema,
  deleteConnectTokenSchema,
  deleteStudentSchema,
  generateConnectTokenSchema,
  getClassMemberByIdSchema,
  updateClassMemberSchema,
} from "@axon/types";
import { Fail, Success } from "@axon/utils";
import { classMemberService } from "./class-member.service.js";

class ClassMemberController {
  createMember = async (
    req: ValidatedRequest<typeof createClassMemberSchema>,
    res: Response
  ) => {
    try {
      const member = await classMemberService.createMember(req.body);
      return res.status(201).json(Success("Class-Member created", member));
    } catch (err: any) {
      return res.status(400).json(Fail(err.message));
    }
  };

  getMemberById = async (
    req: ValidatedRequest<typeof getClassMemberByIdSchema>,
    res: Response
  ) => {
    try {
      const member = await classMemberService.getMemberById(req.params.id);
      if (!member) return res.status(404).json(Fail("Class-Member not found"));

      return res.json(Success("Class-Member retrieved", member));
    } catch (err: any) {
      return res.status(500).json(Fail(err.message));
    }
  };

  updateClassMember = async (
    req: ValidatedRequest<typeof updateClassMemberSchema>,
    res: Response
  ) => {
    try {
      const updated = await classMemberService.updateMember(
        req.params.id,
        req.body
      );
      if (!updated) return res.status(404).json(Fail("Class-Member not found"));

      return res.json(Success("Class-Member updated", updated));
    } catch (err: any) {
      return res.status(400).json(Fail(err.message));
    }
  };

  deleteMember = async (
    req: ValidatedRequest<typeof deleteStudentSchema>,
    res: Response
  ) => {
    try {
      const deleted = await classMemberService.deleteMember(req.params.id);
      if (!deleted) return res.status(404).json(Fail("Class-Member not found"));

      return res.json(Success("Class-Member deleted", deleted));
    } catch (err: any) {
      return res.status(500).json(Fail(err.message));
    }
  };

  listMembers = async (_req: Request, res: Response) => {
    try {
      const members = await classMemberService.listMembers();
      return res.json(Success("Class-Member list retrieved", members));
    } catch (err: any) {
      return res.status(500).json(Fail(err.message));
    }
  };

  generateConnectToken = async (
    req: ValidatedRequest<typeof generateConnectTokenSchema>,
    res: Response
  ) => {
    try {
      const token = await classMemberService.generateConnectToken(
        req.params.id,
        req.body?.ttlHours
      );
      return res.json(
        Success("Connect-Token generated", {
          token: token.token,
          expiresAt: token.expiresAt,
        })
      );
    } catch (err: any) {
      return res.status(400).json(Fail(err.message));
    }
  };

  getConnectTokens = async (
    req: ValidatedRequest<typeof generateConnectTokenSchema>,
    res: Response
  ) => {
    try {
      const tokens = await classMemberService.getActiveConnectTokens(
        req.params.id
      );
      return res.json(Success("Connect-Tokens retrieved", tokens));
    } catch (err: any) {
      return res.status(500).json(Fail(err.message));
    }
  };

  deleteConnectToken = async (
    req: ValidatedRequest<typeof deleteConnectTokenSchema>,
    res: Response
  ) => {
    try {
      const token = await classMemberService.deleteConnectToken(
        req.params.tokenId
      );
      return res.json(Success("Connect-Token deleted", token));
    } catch (err: any) {
      return res.status(500).json(Fail(err.message));
    }
  };
}

export const classMemberController = new ClassMemberController();
