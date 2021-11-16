import { TreasuryEntity } from '../../../src/types/Treasury';

// pass through function as this is a straight copy from mongosh
const ObjectId = (id: string) => id;
const ISODate = (date: string) => date;

export const stubResponse: Array<TreasuryEntity & { __v: number }> = [
  {
    _id: ObjectId("618d0e73cfd110bdfd6852eb"),
    underlying_assets: [
      {
        network: 'ethereum',
        protocol: 'aave',
        assets: 6561.629356917845,
        debt: 0,
        total: 6561.629356917845
      },
      {
        network: 'ethereum',
        protocol: 'aave-v2',
        assets: 12264514.899986172,
        debt: -6394867.8325204495,
        total: 5869647.067465722
      },
      {
        network: 'ethereum',
        protocol: 'alchemix',
        assets: 943578.268523939,
        debt: 0,
        total: 943578.268523939
      },
      {
        network: 'ethereum',
        protocol: 'convex',
        assets: 10504860.920160979,
        debt: 0,
        total: 10504860.920160979
      },
      {
        network: 'ethereum',
        protocol: 'olympus',
        assets: 532199.7065136081,
        debt: 0,
        total: 532199.7065136081
      },
      {
        network: 'ethereum',
        protocol: 'tokens',
        assets: 565132.8056240953,
        debt: 0,
        total: 565132.8056240953
      }
    ],
    treasury: 18421980.39764526,
    createdAt: ISODate("2021-11-11T12:37:07.394Z"),
    updatedAt: ISODate("2021-11-11T12:37:07.394Z"),
    __v: 0
  },
  {
    _id: ObjectId("618d0eaecfd110bdfd6852ed"),
    underlying_assets: [
      {
        network: 'ethereum',
        protocol: 'aave',
        assets: 6561.630497049107,
        debt: 0,
        total: 6561.630497049107
      },
      {
        network: 'ethereum',
        protocol: 'aave-v2',
        assets: 12264515.331831427,
        debt: -6387698.552066428,
        total: 5876816.7797650015
      },
      {
        network: 'ethereum',
        protocol: 'alchemix',
        assets: 943578.466967177,
        debt: 0,
        total: 943578.466967177
      },
      {
        network: 'ethereum',
        protocol: 'convex',
        assets: 10497820.438486401,
        debt: 0,
        total: 10497820.438486401
      },
      {
        network: 'ethereum',
        protocol: 'olympus',
        assets: 532199.7065136081,
        debt: 0,
        total: 532199.7065136081
      },
      {
        network: 'ethereum',
        protocol: 'tokens',
        assets: 565132.8014640952,
        debt: 0,
        total: 565132.8014640952
      }
    ],
    treasury: 18422109.823693335,
    createdAt: ISODate("2021-11-11T12:38:06.411Z"),
    updatedAt: ISODate("2021-11-11T12:38:06.411Z"),
    __v: 0
  },
  {
    _id: ObjectId("618d0ee9cfd110bdfd6852ef"),
    underlying_assets: [
      {
        network: 'ethereum',
        protocol: 'aave',
        assets: 6549.185311197327,
        debt: 0,
        total: 6549.185311197327
      },
      {
        network: 'ethereum',
        protocol: 'aave-v2',
        assets: 12264508.8576252,
        debt: -6398973.574388467,
        total: 5865535.283236731
      },
      {
        network: 'ethereum',
        protocol: 'alchemix',
        assets: 942059.5842712449,
        debt: 0,
        total: 942059.5842712449
      },
      {
        network: 'ethereum',
        protocol: 'convex',
        assets: 10491045.829608642,
        debt: 0,
        total: 10491045.829608642
      },
      {
        network: 'ethereum',
        protocol: 'olympus',
        assets: 531482.6479152056,
        debt: 0,
        total: 531482.6479152056
      },
      {
        network: 'ethereum',
        protocol: 'tokens',
        assets: 564381.647963461,
        debt: 0,
        total: 564381.647963461
      }
    ],
    treasury: 18401054.178306483,
    createdAt: ISODate("2021-11-11T12:39:05.594Z"),
    updatedAt: ISODate("2021-11-11T12:39:05.594Z"),
    __v: 0
  },
  {
    _id: ObjectId("618d0f24cfd110bdfd6852f1"),
    underlying_assets: [
      {
        network: 'ethereum',
        protocol: 'aave',
        assets: 6549.185853091362,
        debt: 0,
        total: 6549.185853091362
      },
      {
        network: 'ethereum',
        protocol: 'aave-v2',
        assets: 12256093.374787897,
        debt: -6398974.273953376,
        total: 5857119.1008345205
      },
      {
        network: 'ethereum',
        protocol: 'alchemix',
        assets: 942059.6834113415,
        debt: 0,
        total: 942059.6834113415
      },
      {
        network: 'ethereum',
        protocol: 'convex',
        assets: 10493190.844164807,
        debt: 0,
        total: 10493190.844164807
      },
      {
        network: 'ethereum',
        protocol: 'olympus',
        assets: 531482.6479152056,
        debt: 0,
        total: 531482.6479152056
      },
      {
        network: 'ethereum',
        protocol: 'tokens',
        assets: 564381.6488434611,
        debt: 0,
        total: 564381.6488434611
      }
    ],
    treasury: 18394783.111022428,
    createdAt: ISODate("2021-11-11T12:40:04.413Z"),
    updatedAt: ISODate("2021-11-11T12:40:04.413Z"),
    __v: 0
  },
  {
    _id: ObjectId("618d0f60cfd110bdfd6852f3"),
    underlying_assets: [
      {
        network: 'ethereum',
        protocol: 'aave',
        assets: 6549.186843189917,
        debt: 0,
        total: 6549.186843189917
      },
      {
        network: 'ethereum',
        protocol: 'aave-v2',
        assets: 12256093.74935693,
        debt: -6398975.55065963,
        total: 5857118.198697299
      },
      {
        network: 'ethereum',
        protocol: 'alchemix',
        assets: 941630.3558150654,
        debt: 0,
        total: 941630.3558150654
      },
      {
        network: 'ethereum',
        protocol: 'convex',
        assets: 10493874.379938707,
        debt: 0,
        total: 10493874.379938707
      },
      {
        network: 'ethereum',
        protocol: 'olympus',
        assets: 531482.6479152056,
        debt: 0,
        total: 531482.6479152056
      },
      {
        network: 'ethereum',
        protocol: 'tokens',
        assets: 564381.6488434611,
        debt: 0,
        total: 564381.6488434611
      }
    ],
    treasury: 18395036.418052927,
    createdAt: ISODate("2021-11-11T12:41:04.904Z"),
    updatedAt: ISODate("2021-11-11T12:41:04.904Z"),
    __v: 0
  },
  {
    _id: ObjectId("618d0f9dcfd110bdfd6852f5"),
    underlying_assets: [
      {
        network: 'ethereum',
        protocol: 'aave',
        assets: 6552.092026879957,
        debt: 0,
        total: 6552.092026879957
      },
      {
        network: 'ethereum',
        protocol: 'aave-v2',
        assets: 12256095.754562523,
        debt: -6398976.932301079,
        total: 5857118.822261446
      },
      {
        network: 'ethereum',
        protocol: 'alchemix',
        assets: 941630.7109940193,
        debt: 0,
        total: 941630.7109940193
      },
      {
        network: 'ethereum',
        protocol: 'convex',
        assets: 10493880.3219604,
        debt: 0,
        total: 10493880.3219604
      },
      {
        network: 'ethereum',
        protocol: 'olympus',
        assets: 531482.6479152056,
        debt: 0,
        total: 531482.6479152056
      },
      {
        network: 'ethereum',
        protocol: 'tokens',
        assets: 564385.1326907336,
        debt: 0,
        total: 564385.1326907336
      }
    ],
    treasury: 18395049.727848686,
    createdAt: ISODate("2021-11-11T12:42:05.577Z"),
    updatedAt: ISODate("2021-11-11T12:42:05.577Z"),
    __v: 0
  },
  {
    _id: ObjectId("618d0fd8cfd110bdfd6852f9"),
    underlying_assets: [
      {
        network: 'ethereum',
        protocol: 'aave',
        assets: 6552.092176139046,
        debt: 0,
        total: 6552.092176139046
      },
      {
        network: 'ethereum',
        protocol: 'aave-v2',
        assets: 12258571.01337097,
        debt: -6398977.107192434,
        total: 5859593.906178537
      },
      {
        network: 'ethereum',
        protocol: 'alchemix',
        assets: 941757.284157035,
        debt: 0,
        total: 941757.284157035
      },
      {
        network: 'ethereum',
        protocol: 'convex',
        assets: 10493977.396352869,
        debt: 0,
        total: 10493977.396352869
      },
      {
        network: 'ethereum',
        protocol: 'olympus',
        assets: 531684.1354552526,
        debt: 0,
        total: 531684.1354552526
      },
      {
        network: 'ethereum',
        protocol: 'tokens',
        assets: 564586.6229007808,
        debt: 0,
        total: 564586.6229007808
      }
    ],
    treasury: 18398151.437220614,
    createdAt: ISODate("2021-11-11T12:43:04.193Z"),
    updatedAt: ISODate("2021-11-11T12:43:04.193Z"),
    __v: 0
  },
  {
    _id: ObjectId("618d1015cfd110bdfd6852fb"),
    underlying_assets: [
      {
        network: 'ethereum',
        protocol: 'aave',
        assets: 6550.640947525269,
        debt: 0,
        total: 6550.640947525269
      },
      {
        network: 'ethereum',
        protocol: 'aave-v2',
        assets: 12258570.526535364,
        debt: -6406148.954782963,
        total: 5852421.571752399
      },
      {
        network: 'ethereum',
        protocol: 'alchemix',
        assets: 941758.3075437176,
        debt: 0,
        total: 941758.3075437176
      },
      {
        network: 'ethereum',
        protocol: 'convex',
        assets: 10503086.04073219,
        debt: 0,
        total: 10503086.04073219
      },
      {
        network: 'ethereum',
        protocol: 'olympus',
        assets: 531684.1354552526,
        debt: 0,
        total: 531684.1354552526
      },
      {
        network: 'ethereum',
        protocol: 'tokens',
        assets: 564594.546727397,
        debt: 0,
        total: 564594.546727397
      }
    ],
    treasury: 18400095.243158482,
    createdAt: ISODate("2021-11-11T12:44:05.936Z"),
    updatedAt: ISODate("2021-11-11T12:44:05.936Z"),
    __v: 0
  },
  {
    _id: ObjectId("618d1054cfd110bdfd6852ff"),
    underlying_assets: [
      {
        network: 'ethereum',
        protocol: 'aave',
        assets: 6550.642249861367,
        debt: 0,
        total: 6550.642249861367
      },
      {
        network: 'ethereum',
        protocol: 'aave-v2',
        assets: 12261020.166845858,
        debt: -6417424.369640764,
        total: 5843595.797205094
      },
      {
        network: 'ethereum',
        protocol: 'alchemix',
        assets: 942005.317231492,
        debt: 0,
        total: 942005.317231492
      },
      {
        network: 'ethereum',
        protocol: 'convex',
        assets: 10503093.266962916,
        debt: 0,
        total: 10503093.266962916
      },
      {
        network: 'ethereum',
        protocol: 'olympus',
        assets: 531684.1354552526,
        debt: 0,
        total: 531684.1354552526
      },
      {
        network: 'ethereum',
        protocol: 'tokens',
        assets: 564594.546727397,
        debt: 0,
        total: 564594.546727397
      }
    ],
    treasury: 18391523.705832012,
    createdAt: ISODate("2021-11-11T12:45:08.725Z"),
    updatedAt: ISODate("2021-11-11T12:45:08.725Z"),
    __v: 0
  },
  {
    _id: ObjectId("618d108acfd110bdfd685304"),
    underlying_assets: [
      {
        network: 'ethereum',
        protocol: 'aave',
        assets: 6549.60602960068,
        debt: 0,
        total: 6549.60602960068
      },
      {
        network: 'ethereum',
        protocol: 'aave-v2',
        assets: 12261019.959666109,
        debt: -6417425.614553272,
        total: 5843594.345112838
      },
      {
        network: 'ethereum',
        protocol: 'alchemix',
        assets: 942005.6147641507,
        debt: 0,
        total: 942005.6147641507
      },
      {
        network: 'ethereum',
        protocol: 'convex',
        assets: 10505625.870166784,
        debt: 0,
        total: 10505625.870166784
      },
      {
        network: 'ethereum',
        protocol: 'olympus',
        assets: 531684.1354552526,
        debt: 0,
        total: 531684.1354552526
      },
      {
        network: 'ethereum',
        protocol: 'tokens',
        assets: 564593.5155416016,
        debt: 0,
        total: 564593.5155416016
      }
    ],
    treasury: 18394053.08707023,
    createdAt: ISODate("2021-11-11T12:46:02.675Z"),
    updatedAt: ISODate("2021-11-11T12:46:02.675Z"),
    __v: 0
  },
  {
    _id: ObjectId("618d13d6a9b74bc46a05f8c1"),
    underlying_assets: [
      {
        network: 'ethereum',
        protocol: 'aave',
        assets: 6548.372651761822,
        debt: 0,
        total: 6548.372651761822
      },
      {
        network: 'ethereum',
        protocol: 'aave-v2',
        assets: 12276786.657917727,
        debt: -6417440.183907903,
        total: 5859346.474009826
      },
      {
        network: 'ethereum',
        protocol: 'alchemix',
        assets: 942605.8332169054,
        debt: 0,
        total: 942605.8332169054
      },
      {
        network: 'ethereum',
        protocol: 'convex',
        assets: 10564088.00603322,
        debt: 0,
        total: 10564088.00603322
      },
      {
        network: 'ethereum',
        protocol: 'olympus',
        assets: 532211.5587218463,
        debt: 0,
        total: 532211.5587218463
      },
      {
        network: 'ethereum',
        protocol: 'tokens',
        assets: 565180.6267859841,
        debt: 0,
        total: 565180.6267859841
      }
    ],
    treasury: 18469980.87141954,
    createdAt: ISODate("2021-11-11T13:00:06.251Z"),
    updatedAt: ISODate("2021-11-11T13:00:06.251Z"),
    __v: 0
  },
  {
    _id: ObjectId("618d21e6a9b74bc46a05f8d8"),
    underlying_assets: [
      {
        network: 'ethereum',
        protocol: 'aave',
        assets: 6519.380245208878,
        debt: 0,
        total: 6519.380245208878
      },
      {
        network: 'ethereum',
        protocol: 'aave-v2',
        assets: 12307143.265557697,
        debt: -6439017.723469596,
        total: 5868125.542088102
      },
      {
        network: 'ethereum',
        protocol: 'alchemix',
        assets: 944932.499055743,
        debt: 0,
        total: 944932.499055743
      },
      {
        network: 'ethereum',
        protocol: 'convex',
        assets: 10611034.2844339,
        debt: 0,
        total: 10611034.2844339
      },
      {
        network: 'ethereum',
        protocol: 'olympus',
        assets: 531938.9579323708,
        debt: 0,
        total: 531938.9579323708
      },
      {
        network: 'ethereum',
        protocol: 'tokens',
        assets: 564865.5790241901,
        debt: 0,
        total: 564865.5790241901
      }
    ],
    treasury: 18527416.242779516,
    createdAt: ISODate("2021-11-11T14:00:06.226Z"),
    updatedAt: ISODate("2021-11-11T14:00:06.226Z"),
    __v: 0
  },
  {
    _id: ObjectId("618df376a9b74bc46a05f905"),
    underlying_assets: [
      {
        network: 'ethereum',
        protocol: 'aave',
        assets: 6486.4954740306575,
        debt: 0,
        total: 6486.4954740306575
      },
      {
        network: 'ethereum',
        protocol: 'aave-v2',
        assets: 12497857.107148245,
        debt: -6484349.414020241,
        total: 6013507.693128004
      },
      {
        network: 'ethereum',
        protocol: 'alchemix',
        assets: 960364.2473425121,
        debt: 0,
        total: 960364.2473425121
      },
      {
        network: 'ethereum',
        protocol: 'convex',
        assets: 10754183.166838074,
        debt: 0,
        total: 10754183.166838074
      },
      {
        network: 'ethereum',
        protocol: 'olympus',
        assets: 554129.0937963771,
        debt: 0,
        total: 554129.0937963771
      },
      {
        network: 'ethereum',
        protocol: 'tokens',
        assets: 1101409.4552836157,
        debt: 0,
        total: 1101409.4552836157
      }
    ],
    treasury: 19390080.151862614,
    createdAt: ISODate("2021-11-12T04:54:14.257Z"),
    updatedAt: ISODate("2021-11-12T04:54:14.257Z"),
    __v: 0
  },
  {
    _id: ObjectId("618df4d2a9b74bc46a05f910"),
    underlying_assets: [
      {
        network: 'ethereum',
        protocol: 'aave',
        assets: 6483.181095751463,
        debt: 0,
        total: 6483.181095751463
      },
      {
        network: 'ethereum',
        protocol: 'aave-v2',
        assets: 12489232.891713945,
        debt: -6484356.727294731,
        total: 6004876.164419212
      },
      {
        network: 'ethereum',
        protocol: 'alchemix',
        assets: 958523.2327812185,
        debt: 0,
        total: 958523.2327812185
      },
      {
        network: 'ethereum',
        protocol: 'convex',
        assets: 10742550.470420659,
        debt: 0,
        total: 10742550.470420659
      },
      {
        network: 'ethereum',
        protocol: 'olympus',
        assets: 553621.2994437455,
        debt: 0,
        total: 553621.2994437455
      },
      {
        network: 'ethereum',
        protocol: 'tokens',
        assets: 1100846.2514848416,
        debt: 0,
        total: 1100846.2514848416
      }
    ],
    treasury: 19366900.599645425,
    createdAt: ISODate("2021-11-12T05:00:02.839Z"),
    updatedAt: ISODate("2021-11-12T05:00:02.839Z"),
    __v: 0
  },
  {
    _id: ObjectId("618e02e3a9b74bc46a05f92e"),
    underlying_assets: [
      {
        network: 'ethereum',
        protocol: 'aave',
        assets: 6439.869537389664,
        debt: 0,
        total: 6439.869537389664
      },
      {
        network: 'ethereum',
        protocol: 'aave-v2',
        assets: 12433963.54036486,
        debt: -6408591.380532891,
        total: 6025372.159831968
      },
      {
        network: 'ethereum',
        protocol: 'alchemix',
        assets: 956446.4662678179,
        debt: 0,
        total: 956446.4662678179
      },
      {
        network: 'ethereum',
        protocol: 'convex',
        assets: 10657675.872239543,
        debt: 0,
        total: 10657675.872239543
      },
      {
        network: 'ethereum',
        protocol: 'olympus',
        assets: 553244.9342176775,
        debt: 0,
        total: 553244.9342176775
      },
      {
        network: 'ethereum',
        protocol: 'tokens',
        assets: 1097786.708946775,
        debt: 0,
        total: 1097786.708946775
      }
    ],
    treasury: 19296966.01104117,
    createdAt: ISODate("2021-11-12T06:00:03.044Z"),
    updatedAt: ISODate("2021-11-12T06:00:03.044Z"),
    __v: 0
  },
  {
    _id: ObjectId("618e10f2a9b74bc46a05f94b"),
    underlying_assets: [
      {
        network: 'ethereum',
        protocol: 'aave',
        assets: 6430.3739631644585,
        debt: 0,
        total: 6430.3739631644585
      },
      {
        network: 'ethereum',
        protocol: 'aave-v2',
        assets: 12418785.92127596,
        debt: -6401487.267154706,
        total: 6017298.654121254
      },
      {
        network: 'ethereum',
        protocol: 'alchemix',
        assets: 953698.1055449885,
        debt: 0,
        total: 953698.1055449885
      },
      {
        network: 'ethereum',
        protocol: 'convex',
        assets: 10634263.309740163,
        debt: 0,
        total: 10634263.309740163
      },
      {
        network: 'ethereum',
        protocol: 'olympus',
        assets: 554589.0957393493,
        debt: 0,
        total: 554589.0957393493
      },
      {
        network: 'ethereum',
        protocol: 'tokens',
        assets: 1097586.23447769,
        debt: 0,
        total: 1097586.23447769
      }
    ],
    treasury: 19263865.77358661,
    createdAt: ISODate("2021-11-12T07:00:02.435Z"),
    updatedAt: ISODate("2021-11-12T07:00:02.435Z"),
    __v: 0
  },
  {
    _id: ObjectId("618e1f0aa9b74bc46a05f964"),
    underlying_assets: [
      {
        network: 'ethereum',
        protocol: 'aave',
        assets: 6336.439848063463,
        debt: 0,
        total: 6336.439848063463
      },
      {
        network: 'ethereum',
        protocol: 'aave-v2',
        assets: 12328806.369821686,
        debt: -6372863.654577952,
        total: 5955942.715243734
      },
      {
        network: 'ethereum',
        protocol: 'alchemix',
        assets: 946779.1837518356,
        debt: 0,
        total: 946779.1837518356
      },
      {
        network: 'ethereum',
        protocol: 'convex',
        assets: 10552221.286060248,
        debt: 0,
        total: 10552221.286060248
      },
      {
        network: 'ethereum',
        protocol: 'olympus',
        assets: 550012.9725144578,
        debt: 0,
        total: 550012.9725144578
      },
      {
        network: 'ethereum',
        protocol: 'tokens',
        assets: 1089032.042354764,
        debt: 0,
        total: 1089032.042354764
      }
    ],
    treasury: 19100324.6397731,
    createdAt: ISODate("2021-11-12T08:00:10.899Z"),
    updatedAt: ISODate("2021-11-12T08:00:10.899Z"),
    __v: 0
  },
  {
    _id: ObjectId("618e2d15a9b74bc46a05f979"),
    underlying_assets: [
      {
        network: 'ethereum',
        protocol: 'aave',
        assets: 6432.337173984323,
        debt: 0,
        total: 6432.337173984323
      },
      {
        network: 'ethereum',
        protocol: 'aave-v2',
        assets: 12361581.12953781,
        debt: -6405730.509773218,
        total: 5955850.61976459
      },
      {
        network: 'ethereum',
        protocol: 'alchemix',
        assets: 950505.3627878773,
        debt: 0,
        total: 950505.3627878773
      },
      {
        network: 'ethereum',
        protocol: 'convex',
        assets: 10634332.52151987,
        debt: 0,
        total: 10634332.52151987
      },
      {
        network: 'ethereum',
        protocol: 'olympus',
        assets: 557987.1665967271,
        debt: 0,
        total: 557987.1665967271
      },
      {
        network: 'ethereum',
        protocol: 'tokens',
        assets: 1102275.2836175773,
        debt: 0,
        total: 1102275.2836175773
      }
    ],
    treasury: 19207383.291460626,
    createdAt: ISODate("2021-11-12T09:00:05.488Z"),
    updatedAt: ISODate("2021-11-12T09:00:05.488Z"),
    __v: 0
  },
  {
    _id: ObjectId("618e3b25a9b74bc46a05f985"),
    underlying_assets: [
      {
        network: 'ethereum',
        protocol: 'aave',
        assets: 6297.944631392108,
        debt: 0,
        total: 6297.944631392108
      },
      {
        network: 'ethereum',
        protocol: 'aave-v2',
        assets: 12181348.618002448,
        debt: -6268462.048616812,
        total: 5912886.569385637
      },
      {
        network: 'ethereum',
        protocol: 'alchemix',
        assets: 936750.3784407587,
        debt: 0,
        total: 936750.3784407587
      },
      {
        network: 'ethereum',
        protocol: 'convex',
        assets: 10377423.287308916,
        debt: 0,
        total: 10377423.287308916
      },
      {
        network: 'ethereum',
        protocol: 'olympus',
        assets: 543789.6150973296,
        debt: 0,
        total: 543789.6150973296
      },
      {
        network: 'ethereum',
        protocol: 'tokens',
        assets: 1077289.4840906463,
        debt: 0,
        total: 1077289.4840906463
      }
    ],
    treasury: 18854437.278954677,
    createdAt: ISODate("2021-11-12T10:00:05.918Z"),
    updatedAt: ISODate("2021-11-12T10:00:05.918Z"),
    __v: 0
  },
  {
    _id: ObjectId("618f6c62a9b74bc46a05f9ad"),
    underlying_assets: [
      {
        network: 'ethereum',
        protocol: 'aave',
        assets: 6434.04848644494,
        debt: 0,
        total: 6434.04848644494
      },
      {
        network: 'ethereum',
        protocol: 'aave-v2',
        assets: 12110534.372416325,
        debt: -6428838.096778777,
        total: 5681696.275637547
      },
      {
        network: 'ethereum',
        protocol: 'alchemix',
        assets: 930013.2828481599,
        debt: 0,
        total: 930013.2828481599
      },
      {
        network: 'ethereum',
        protocol: 'convex',
        assets: 10482813.264053414,
        debt: 0,
        total: 10482813.264053414
      },
      {
        network: 'ethereum',
        protocol: 'olympus',
        assets: 538091.670187947,
        debt: 0,
        total: 538091.670187947
      },
      {
        network: 'ethereum',
        protocol: 'tokens',
        assets: 1068455.670247692,
        debt: 0,
        total: 1068455.670247692
      }
    ],
    treasury: 18707504.211461205,
    createdAt: ISODate("2021-11-13T07:42:26.641Z"),
    updatedAt: ISODate("2021-11-13T07:42:26.641Z"),
    __v: 0
  }
]