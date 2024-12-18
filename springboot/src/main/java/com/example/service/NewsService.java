package com.example.service;

import cn.hutool.core.date.DateUtil;
import com.example.common.enums.RoleEnum;
import com.example.entity.Account;
import com.example.entity.News;
import com.example.mapper.NewsMapper;
import com.example.utils.TokenUtils;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Random;

/**
 * 新闻信息业务处理
 **/
@Service
public class NewsService {

    @Resource
    private NewsMapper newsMapper;
    @Resource
    private CommentService commentService;

    /**
     * 新增
     */
    public void add(News news) {
        news.setTime(DateUtil.now());
        Account currentUser = TokenUtils.getCurrentUser();
        if (currentUser.getRole().equals(RoleEnum.ADMIN.name())) {
            news.setStatus("通过");
            news.setType("common");
        }
        newsMapper.insert(news);
    }

    /**
     * 删除
     */
    public void deleteById(Integer id) {
        newsMapper.deleteById(id);
    }

    /**
     * 批量删除
     */
    public void deleteBatch(List<Integer> ids) {
        for (Integer id : ids) {
            newsMapper.deleteById(id);
        }
    }

    /**
     * 修改
     */
    public void updateById(News news) {
        newsMapper.updateById(news);
    }

    /**
     * 根据ID查询
     */
    public News selectById(Integer id) {
        return newsMapper.selectById(id);
    }

    /**
     * 查询所有
     */
    public List<News> selectAll(News news) {
        return newsMapper.selectAll(news);
    }

    /**
     * 分页查询
     */
    public PageInfo<News> selectPage(News news, Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<News> list = newsMapper.selectAll(news);
        //为每条新闻查询评论数量
        for (News n : list) {
            Integer count = commentService.selectCount(n.getId(), "news");
            n.setCommentCount(count);
        }
        return PageInfo.of(list);
    }


    public List<News> getHotNews() {
        return newsMapper.selectHot();
    }

    public void updateReadCount(Integer id) {
        newsMapper.updateReadCount(id);
    }
}