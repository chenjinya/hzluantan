/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 50715
 Source Host           : localhost
 Source Database       : bintreestory

 Target Server Type    : MySQL
 Target Server Version : 50715
 File Encoding         : utf-8

 Date: 09/22/2016 14:05:45 PM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `chapter`
-- ----------------------------
DROP TABLE IF EXISTS `chapter`;
CREATE TABLE `chapter` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `story_id` bigint(20) NOT NULL,
  `chapter_id` bigint(20) unsigned DEFAULT NULL,
  `author_id` bigint(20) unsigned NOT NULL,
  `zan_count` int(10) unsigned DEFAULT '0',
  `visit_count` int(10) unsigned DEFAULT NULL,
  `title` varchar(400) DEFAULT NULL,
  `content` text,
  `node_id` bigint(20) unsigned DEFAULT NULL,
  `depth` int(10) unsigned DEFAULT '0',
  `path` text,
  `status` int(10) unsigned DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`story_id`,`author_id`),
  UNIQUE KEY `chapter_id` (`chapter_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `chapter`
-- ----------------------------
BEGIN;
INSERT INTO `chapter` VALUES ('1', '28', '17', '1', '0', null, 'chapter 1 title', 'chapter 1 content', '15', '0', null, '0', '2016-09-22 10:56:10', '2016-09-22 10:56:10'), ('2', '28', '18', '1', '0', null, 'chapter2 title', 'chapter 2 content', '17', '0', null, '0', '2016-09-22 11:03:14', '2016-09-22 11:03:14'), ('3', '28', '19', '1', '0', null, 'chapter 3 title', 'chapter 3 content', '19', '0', null, '0', '2016-09-22 11:23:57', '2016-09-22 11:23:57'), ('4', '28', '20', '1', '0', null, 'chapter 2 title', 'chapter 1 node 1 chapter 2', '16', '0', null, '0', '2016-09-22 11:37:30', '2016-09-22 11:37:30'), ('5', '29', '21', '1', '0', null, '第一章 城市清理队', '清晨4:50，老刀穿过熙熙攘攘的步行街，去找彭蠡。\n\n从垃圾站下班之后，老刀回家洗了个澡，换了衣服。白色衬衫和褐色裤子，这是他唯一一套体面衣服，衬衫袖口磨了边，他把袖子卷到胳膊肘。老刀四十八岁，没结婚，已经过了注意外表的年龄，又没人照顾起居，这一套衣服留着穿了很多年，每次穿一天，回家就脱了叠上。他在垃圾站上班，没必要穿得体面，偶尔参加谁家小孩的婚礼，才拿出来穿在身上。这一次他不想脏兮兮地见陌生人。他在垃圾站连续工作了五小时，很担心身上会有味道。\n\n步行街上挤满了刚刚下班的人。拥挤的男人女人围着小摊子挑土特产，大声讨价还价。食客围着塑料桌子，埋头在酸辣粉的热气腾腾中，饿虎扑食一般，白色蒸汽遮住了脸。油炸的香味弥漫。货摊上的酸枣和核桃堆成山，腊肉在头顶摇摆。这个点是全天最热闹的时间，基本都收工了，忙碌了几个小时的人们都赶过来吃一顿饱饭，人声鼎沸。\n\n老刀艰难地穿过人群。端盘子的伙计一边喊着让让一边推开挡道的人，开出一条路来，老刀跟在后面。\n\n彭蠡家在小街深处。老刀上楼，彭蠡不在家。问邻居，邻居说他每天快到关门才回来，具体几点不清楚。\n\n老刀有点担忧，看了看手表，清晨5点。\n\n他回到楼门口等着。两旁狼吞虎咽的饥饿少年围绕着他。他认识其中两个，原来在彭蠡家见过一两次。少年每人面前摆着一盘炒面或炒粉，几个人分吃两个菜，盘子里一片狼藉，筷子扔在无望而锲而不舍地拨动，寻找辣椒丛中的肉星。老刀又下意识闻了闻小臂，不知道身上还有没有垃圾的腥味。周围的一切嘈杂而庸常，和每个清晨一样。\n\n“哎，你们知道那儿一盘回锅肉多少钱吗?”那个叫小李的少年说。\n\n“靠，菜里有沙子。”另外一个叫小丁的胖少年突然捂住嘴说，他的指甲里还带着黑泥， “坑人啊。得找老板退钱!”\n　　\n“人家那儿一盘回锅肉，就三百四。”小李说，“三百四!一盘水煮牛肉四百二呢。”\n　\n“什么玩意?这么贵。”小丁捂着腮帮子咕哝道。\n　　\n另外两个少年对谈话没兴趣，还在埋头吃面，小李低头看着他们，眼睛似乎穿过他们，看到了某个看不见的地方，目光里有热切。\n　　\n老刀的肚子也感觉到饥饿。他迅速转开眼睛，可是来不及了，那种感觉迅速席卷了他，胃的空虚像是一个深渊，让他身体微微发颤。他有一个月不吃清晨这顿饭了。一顿饭差不多一百块，一个月三千块，攒上一年就够糖糖两个月的幼儿园开销了。\n\n他向远处看，城市清理队的车辆已经缓缓开过来了。', '24', '0', null, '0', '2016-09-22 13:18:41', '2016-09-22 13:18:41'), ('6', '29', '22', '1', '0', null, '第二章 这时彭蠡出现了', '他开始做准备，若彭蠡一时再不回来，他就要考虑自己行动了。虽然会带来不少困难，但时间不等人，总得走才行。身边卖大枣的女人高声叫卖，不时打断他的思绪，声音的洪亮刺得他头疼。步行街一端的小摊子开始收拾，人群像用棍子搅动的池塘里的鱼，倏一下散去。没人会在这时候和清理队较劲。小摊子收拾得比较慢，清理队的车耐心地移动。步行街通常只是步行街，但对清理队的车除外。谁若走得慢了，就被强行收拢起来。\n　　\n这时彭蠡出现了。他剔着牙，敞着衬衫的扣子，不紧不慢地踱回来，不时打饱嗝。彭蠡六十多了，变得懒散不修边幅，两颊像沙皮狗一样耷拉着，让嘴角显得总是不满意地撇着。如果只看这幅模样，不知道他年轻时的样子，会以为他只是个胸无大志只知道吃喝的怂包。但从老刀很小的时候，他就听父亲讲过彭蠡的事。\n　　\n老刀迎上前去。彭蠡看到他要打招呼，老刀却打断他：“我没时间和你解释。我需要去第一空间，你告诉我怎么走。”\n　　\n彭蠡愣住了，已经有十年没人跟他提过第一空间的事，他的牙签捏在手里，不知不觉掰断了。他有片刻没回答，见老刀实在有点急了，才拽着他向楼里走。“回我家说，”彭蠡说，“要走也从那儿走。”\n欢迎关注我们微信公众号yjbys_com，面试通知早知道，宣讲会微信公众号[xiaoyuan_xjh]\n　　\n在他们身后，清理队已经缓缓开了过来，像秋风扫落叶一样将人们扫回家。“回家啦，回家啦。转换马上开始了。”车上有人吆喝着。\n　　\n彭蠡带老刀上楼，进屋。他的单人小房子和一般公租屋无异，六平米房间，一个厕所，一个能做菜的角落，一张桌子一把椅子，胶囊床铺，胶囊下是抽拉式箱柜，可以放衣服物品。墙面上有水渍和鞋印，没做任何修饰，只是歪斜着贴了几个挂钩，挂着夹克和裤子。进屋后，彭蠡把墙上的衣服毛巾都取下来，塞到最靠边的抽屉里。转换的时候，什么都不能挂出来。老刀以前也住这样的单人公租房。一进屋，他就感到一股旧日的气息。\n　　\n彭蠡直截了当地瞪着老刀：“你不告诉我为什么，我就不告诉你怎么走。”\n\n已经5点半了，还有半个小时。', '25', '0', null, '0', '2016-09-22 13:46:52', '2016-09-22 13:46:52');
COMMIT;

-- ----------------------------
--  Table structure for `node`
-- ----------------------------
DROP TABLE IF EXISTS `node`;
CREATE TABLE `node` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `node_id` bigint(10) unsigned NOT NULL,
  `parent_id` bigint(20) unsigned DEFAULT NULL,
  `author_id` bigint(10) unsigned DEFAULT NULL,
  `story_id` bigint(11) unsigned NOT NULL,
  `content` varchar(255) DEFAULT '',
  `status` int(10) unsigned DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`story_id`,`node_id`),
  UNIQUE KEY `node_id` (`node_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `node`
-- ----------------------------
BEGIN;
INSERT INTO `node` VALUES ('1', '15', '15', '1', '28', '', '0', '2016-09-22 09:59:26', '2016-09-22 09:59:26'), ('2', '16', '15', '1', '28', 'chapter 1 node 1', '0', '2016-09-22 10:56:10', '2016-09-22 10:56:10'), ('3', '17', '15', '1', '28', 'chapger 1 node 2', '0', '2016-09-22 10:56:10', '2016-09-22 10:56:10'), ('4', '18', '17', '1', '28', 'chapter 2 ndoe 1', '0', '2016-09-22 11:03:14', '2016-09-22 11:03:14'), ('5', '19', '17', '1', '28', 'chapter 2 node 2', '0', '2016-09-22 11:03:14', '2016-09-22 11:03:14'), ('6', '20', '19', '1', '28', 'chapter 3 node 1', '0', '2016-09-22 11:23:57', '2016-09-22 11:23:57'), ('7', '21', '19', '1', '28', 'chapter 3 node 2', '0', '2016-09-22 11:23:57', '2016-09-22 11:23:57'), ('8', '22', '19', '1', '28', 'chapter 3 node 3', '0', '2016-09-22 11:23:57', '2016-09-22 11:23:57'), ('9', '23', '16', '1', '28', 'chapter 2 node 1', '0', '2016-09-22 11:37:30', '2016-09-22 11:37:30'), ('10', '24', '24', '1', '29', '', '0', '2016-09-22 13:13:28', '2016-09-22 13:13:28'), ('11', '25', '24', '1', '29', '他开始做准备，若彭蠡一时再不回来，他就要考虑自己行动了', '0', '2016-09-22 13:18:41', '2016-09-22 13:18:41'), ('12', '26', '24', '1', '29', '他放弃了这次行动', '0', '2016-09-22 13:18:41', '2016-09-22 13:18:41'), ('13', '27', '25', '1', '29', '老刀简单讲了事情的始末', '0', '2016-09-22 13:46:52', '2016-09-22 13:46:52'), ('14', '28', '25', '1', '29', '老刀没有告诉他', '0', '2016-09-22 13:46:52', '2016-09-22 13:46:52');
COMMIT;

-- ----------------------------
--  Table structure for `story`
-- ----------------------------
DROP TABLE IF EXISTS `story`;
CREATE TABLE `story` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `story_id` bigint(20) unsigned NOT NULL,
  `node_id` bigint(20) unsigned DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `author_id` bigint(20) unsigned NOT NULL,
  `status` int(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `story_id` (`story_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `story`
-- ----------------------------
BEGIN;
INSERT INTO `story` VALUES ('1', '28', '15', 'story 1 title', 'story 1 cotnent', '1', '0', '2016-09-22 09:59:26', '2016-09-22 09:59:26'), ('2', '29', '24', '北京折叠', '北京时间2016年8月21日上午9时，第74届雨果奖颁奖典礼在美国堪萨斯城举行。中国科幻女作家郝景芳凭借《北京折叠》(Folding Beijing)获得最佳中短篇小说奖。这也是继刘慈欣之后又一位中国科幻作家获得雨果奖。\n　　\n与刘慈欣的《三体》一样，《北京折叠》的译者同为美籍华裔科幻作家刘宇昆。2015年，《三体》英文版译者刘宇昆把《北京折叠》译成英文，收录在《看不见的星球：中国当代科幻小说选集》一书中。因此，刘宇昆堪称幕后功臣，先后将两位中国科幻作家送上“雨果奖”领奖台。', '1', '0', '2016-09-22 13:13:28', '2016-09-22 13:13:28');
COMMIT;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `phone_num` varchar(255) DEFAULT NULL,
  `verify` int(10) unsigned DEFAULT NULL,
  `status` int(10) unsigned DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('1', '1', '123123', 'chenjinya', '18810551336', '0', '0', '2016-09-18 15:34:19', '2016-09-18 15:34:21');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
