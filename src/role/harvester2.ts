00000000: 6578 706f 7274 2063 6f6e 7374 2072 6f6c  export const rol
00000010: 6548 6172 7665 7374 6572 3220 3d20 2873  eHarvester2 = (s
00000020: 6f75 7263 6549 643a 2049 643c 536f 7572  ourceId: Id<Sour
00000030: 6365 3e2c 206c 696e 6b49 643a 2049 643c  ce>, linkId: Id<
00000040: 5374 7275 6374 7572 654c 696e 6b3e 2920  StructureLink>) 
00000050: 3d3e 2028 7b0d 0a20 2070 7265 7061 7265  => ({..  prepare
00000060: 3a20 2863 7265 6570 3a20 4372 6565 7029  : (creep: Creep)
00000070: 203d 3e20 7b0d 0a20 2020 2063 7265 6570   => {..    creep
00000080: 2e6d 6f76 6554 6f28 4761 6d65 2e67 6574  .moveTo(Game.get
00000090: 4f62 6a65 6374 4279 4964 2873 6f75 7263  ObjectById(sourc
000000a0: 6549 6429 293b 0d0a 2020 7d2c 0d0a 2020  eId));..  },..  
000000b0: 6973 5265 6164 793a 2028 6372 6565 703a  isReady: (creep:
000000c0: 2043 7265 6570 2920 3d3e 207b 0d0a 2020   Creep) => {..  
000000d0: 2020 7265 7475 726e 2063 7265 6570 2e70    return creep.p
000000e0: 6f73 2e69 734e 6561 7254 6f28 4761 6d65  os.isNearTo(Game
000000f0: 2e67 6574 4f62 6a65 6374 4279 4964 2873  .getObjectById(s
00000100: 6f75 7263 6549 6429 293b 0d0a 2020 7d2c  ourceId));..  },
00000110: 0d0a 2020 736f 7572 6365 3a20 2863 7265  ..  source: (cre
00000120: 6570 3a20 4372 6565 7029 203d 3e20 7b0d  ep: Creep) => {.
00000130: 0a20 2020 2063 6f6e 7374 206c 696e 6b20  .    const link 
00000140: 3d20 4761 6d65 2e67 6574 4f62 6a65 6374  = Game.getObject
00000150: 4279 4964 286c 696e 6b49 6429 3b0d 0a20  ById(linkId);.. 
00000160: 2020 2063 6f6e 736f 6c65 2e6c 6f67 2827     console.log('
00000170: 726f 6c65 4861 7276 6573 7465 7232 2e73  roleHarvester2.s
00000180: 6f75 7263 653a 272c 206c 696e 6b2e 706f  ource:', link.po
00000190: 7329 3b0d 0a20 2020 2063 6f6e 736f 6c65  s);..    console
000001a0: 2e6c 6f67 2827 726f 6c65 4861 7276 6573  .log('roleHarves
000001b0: 7465 7232 2e73 6f75 7263 653a 272c 206c  ter2.source:', l
000001c0: 696e 6b2e 7374 6f72 652e 6765 7446 7265  ink.store.getFre
000001d0: 6543 6170 6163 6974 7928 5245 534f 5552  eCapacity(RESOUR
000001e0: 4345 5f45 4e45 5247 5929 293b 0d0a 2020  CE_ENERGY));..  
000001f0: 2020 6966 2028 6c69 6e6b 2e73 746f 7265    if (link.store
00000200: 2e67 6574 4672 6565 4361 7061 6369 7479  .getFreeCapacity
00000210: 2852 4553 4f55 5243 455f 454e 4552 4759  (RESOURCE_ENERGY
00000220: 2920 3d3d 2030 2920 7b0d 0a20 2020 2020  ) == 0) {..     
00000230: 2063 6f6e 736f 6c65 2e6c 6f67 2827 726f   console.log('ro
00000240: 6c65 4861 7276 6573 7465 7232 2e73 6f75  leHarvester2.sou
00000250: 7263 653a 272c 2027 3132 3327 293b 0d0a  rce:', '123');..
00000260: 2020 2020 2020 636f 6e73 7420 6365 6e74        const cent
00000270: 6572 466c 6167 203d 2047 616d 652e 666c  erFlag = Game.fl
00000280: 6167 735b 6372 6565 702e 726f 6f6d 2e6e  ags[creep.room.n
00000290: 616d 652b 2763 656e 7465 7227 5d3b 0d0a  ame+'center'];..
000002a0: 2020 2020 2020 636f 6e73 7420 6365 6e74        const cent
000002b0: 6572 4c69 6e6b 3a20 5374 7275 6374 7572  erLink: Structur
000002c0: 654c 696e 6b5b 5d20 3d20 6372 6565 702e  eLink[] = creep.
000002d0: 726f 6f6d 2e66 696e 6428 4649 4e44 5f4d  room.find(FIND_M
000002e0: 595f 5354 5255 4354 5552 4553 2c20 7b66  Y_STRUCTURES, {f
000002f0: 696c 7465 723a 2028 7374 7275 6374 7572  ilter: (structur
00000300: 6529 203d 3e20 7b0d 0a20 2020 2020 2020  e) => {..       
00000310: 2072 6574 7572 6e20 7374 7275 6374 7572   return structur
00000320: 652e 7374 7275 6374 7572 6554 7970 6520  e.structureType 
00000330: 3d3d 2053 5452 5543 5455 5245 5f4c 494e  == STRUCTURE_LIN
00000340: 4b20 2626 2073 7472 7563 7475 7265 2e70  K && structure.p
00000350: 6f73 2e69 734e 6561 7254 6f28 6365 6e74  os.isNearTo(cent
00000360: 6572 466c 6167 293b 0d0a 2020 2020 2020  erFlag);..      
00000370: 7d7d 293b 0d0a 2020 2020 2020 6c69 6e6b  }});..      link
00000380: 2e74 7261 6e73 6665 7245 6e65 7267 7928  .transferEnergy(
00000390: 6365 6e74 6572 4c69 6e6b 5b30 5d29 3b0d  centerLink[0]);.
000003a0: 0a20 2020 207d 0d0a 2020 2020 6966 2028  .    }..    if (
000003b0: 6372 6565 702e 6861 7276 6573 7428 4761  creep.harvest(Ga
000003c0: 6d65 2e67 6574 4f62 6a65 6374 4279 4964  me.getObjectById
000003d0: 2873 6f75 7263 6549 6429 2920 3d3d 2045  (sourceId)) == E
000003e0: 5252 5f4e 4f54 5f49 4e5f 5241 4e47 4529  RR_NOT_IN_RANGE)
000003f0: 207b 0d0a 2020 2020 2020 6372 6565 702e   {..      creep.
00000400: 6d6f 7665 546f 2847 616d 652e 6765 744f  moveTo(Game.getO
00000410: 626a 6563 7442 7949 6428 736f 7572 6365  bjectById(source
00000420: 4964 2929 3b0d 0a20 2020 207d 0d0a 2020  Id));..    }..  
00000430: 2020 7265 7475 726e 2063 7265 6570 2e73    return creep.s
00000440: 746f 7265 2e67 6574 4672 6565 4361 7061  tore.getFreeCapa
00000450: 6369 7479 2829 203d 3d20 303b 0d0a 2020  city() == 0;..  
00000460: 7d2c 0d0a 2020 7461 7267 6574 3a20 2863  },..  target: (c
00000470: 7265 6570 3a20 4372 6565 7029 203d 3e20  reep: Creep) => 
00000480: 7b0d 0a20 2020 2063 6f6e 7374 206c 696e  {..    const lin
00000490: 6b20 3d20 4761 6d65 2e67 6574 4f62 6a65  k = Game.getObje
000004a0: 6374 4279 4964 286c 696e 6b49 6429 3b0d  ctById(linkId);.
000004b0: 0a20 2020 2063 6f6e 736f 6c65 2e6c 6f67  .    console.log
000004c0: 2827 726f 6c65 4861 7276 6573 7465 7232  ('roleHarvester2
000004d0: 2e74 6172 6765 743a 272c 206c 696e 6b2e  .target:', link.
000004e0: 706f 7329 3b0d 0a20 2020 2063 6f6e 736f  pos);..    conso
000004f0: 6c65 2e6c 6f67 2827 726f 6c65 4861 7276  le.log('roleHarv
00000500: 6573 7465 7232 2e74 6172 6765 743a 272c  ester2.target:',
00000510: 206c 696e 6b2e 7374 6f72 652e 6765 7446   link.store.getF
00000520: 7265 6543 6170 6163 6974 7928 5245 534f  reeCapacity(RESO
00000530: 5552 4345 5f45 4e45 5247 5929 293b 0d0a  URCE_ENERGY));..
00000540: 2020 2020 6966 2028 6c69 6e6b 2e73 746f      if (link.sto
00000550: 7265 2e67 6574 4672 6565 4361 7061 6369  re.getFreeCapaci
00000560: 7479 2852 4553 4f55 5243 455f 454e 4552  ty(RESOURCE_ENER
00000570: 4759 2920 3d3d 2030 2920 7b0d 0a20 2020  GY) == 0) {..   
00000580: 2020 2063 6f6e 736f 6c65 2e6c 6f67 2827     console.log('
00000590: 726f 6c65 4861 7276 6573 7465 7232 2e74  roleHarvester2.t
000005a0: 6172 6765 743a 272c 2027 3132 3327 293b  arget:', '123');
000005b0: 0d0a 2020 2020 2020 636f 6e73 7420 6365  ..      const ce
000005c0: 6e74 6572 466c 6167 203d 2047 616d 652e  nterFlag = Game.
000005d0: 666c 6167 735b 6372 6565 702e 726f 6f6d  flags[creep.room
000005e0: 2e6e 616d 652b 2763 656e 7465 7227 5d3b  .name+'center'];
000005f0: 0d0a 2020 2020 2020 636f 6e73 7420 6365  ..      const ce
00000600: 6e74 6572 4c69 6e6b 3a20 5374 7275 6374  nterLink: Struct
00000610: 7572 654c 696e 6b5b 5d20 3d20 6372 6565  ureLink[] = cree
00000620: 702e 726f 6f6d 2e66 696e 6428 4649 4e44  p.room.find(FIND
00000630: 5f4d 595f 5354 5255 4354 5552 4553 2c20  _MY_STRUCTURES, 
00000640: 7b66 696c 7465 723a 2028 7374 7275 6374  {filter: (struct
00000650: 7572 6529 203d 3e20 7b0d 0a20 2020 2020  ure) => {..     
00000660: 2020 2072 6574 7572 6e20 7374 7275 6374     return struct
00000670: 7572 652e 7374 7275 6374 7572 6554 7970  ure.structureTyp
00000680: 6520 3d3d 2053 5452 5543 5455 5245 5f4c  e == STRUCTURE_L
00000690: 494e 4b20 2626 2073 7472 7563 7475 7265  INK && structure
000006a0: 2e70 6f73 2e69 734e 6561 7254 6f28 6365  .pos.isNearTo(ce
000006b0: 6e74 6572 466c 6167 293b 0d0a 2020 2020  nterFlag);..    
000006c0: 2020 7d7d 293b 0d0a 2020 2020 2020 6c69    }});..      li
000006d0: 6e6b 2e74 7261 6e73 6665 7245 6e65 7267  nk.transferEnerg
000006e0: 7928 6365 6e74 6572 4c69 6e6b 5b30 5d29  y(centerLink[0])
000006f0: 3b0d 0a20 2020 207d 0d0a 2020 2020 6966  ;..    }..    if
00000700: 2028 6372 6565 702e 7472 616e 7366 6572   (creep.transfer
00000710: 286c 696e 6b2c 2052 4553 4f55 5243 455f  (link, RESOURCE_
00000720: 454e 4552 4759 2920 3d3d 2045 5252 5f4e  ENERGY) == ERR_N
00000730: 4f54 5f49 4e5f 5241 4e47 4529 207b 0d0a  OT_IN_RANGE) {..
00000740: 2020 2020 2020 6372 6565 702e 6d6f 7665        creep.move
00000750: 546f 286c 696e 6b29 3b0d 0a20 2020 207d  To(link);..    }
00000760: 0d0a 2020 2020 7265 7475 726e 2063 7265  ..    return cre
00000770: 6570 2e73 746f 7265 2e67 6574 5573 6564  ep.store.getUsed
00000780: 4361 7061 6369 7479 2829 203d 3d20 303b  Capacity() == 0;
00000790: 0d0a 2020 7d0d 0a7d 293b 0d0a            ..  }..});..