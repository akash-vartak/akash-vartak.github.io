---
layout: post
title: Joint Audio-Visual Deepfake Detection
description: 
paperurl: https://ieeexplore.ieee.org/document/9710387
date: 2024-03-15
tags: trustworthy audio vision
categories: sample-posts
related_posts: true

authors:
  - name: Yipin Zhou
    affiliations:
      name: Facebook AI
  - name: Ser-Nam Lim
    affiliations:
      name: Facebook AI

# Optionally, you can add a table of contents to your post.
# NOTES:
#   - make sure that TOC names match the actual section names
#     for hyperlinks within the post to work correctly.
#   - we may want to automate TOC generation in the future using
#     jekyll-toc plugin (https://github.com/toshimaru/jekyll-toc).
toc:
  - name: Paper Abstract
  - name: TL;DR
  - name: Paper Summary

---

## Paper Abstract

Deepfakes (”deep learning” + ”fake”) are videos synthetically generated with AI algorithms. While they could be entertaining, they could also be misused for falsifying speeches and spreading misinformation. The process to create deepfakes involves both visual and auditory manipulations. Exploration on detecting visual deepfakes has produced a number of detection methods as well as datasets, while audio deepfakes (e.g. synthetic speech from text-tospeech or voice conversion systems) and the relationship between the video and audio modalities have been relatively neglected. In this work, we propose a novel visual / auditory deepfake joint detection task and show that exploiting the intrinsic synchronization between the visual and auditory modalities could benefit deepfake detection Experiments demonstrate that the proposed joint detection framework outperforms independently trained models and at the same time, yields superior generalization capability on unseen types of deepfakes.

---

## TL;DR

Propose a novel visual / auditory deepfake joint detection task and show that exploiting the intrinsic synchronization between the visual and auditory modalities could benefit deepfake detection. 

---

## Paper Summary

We propose to model the video and audio stream separately with their own labels, as well as temporally aligning the coarse-to-fine representations from both streams. We refer to this as sync-stream, which itself is given a separate label that reflects whether any one of the modalities has been manipulated. 

By jointly training as we proposed, the network not only learns ‘appearance’ or texture artifacts but also benefits from the sync-steam that discriminates synchronization patterns of authentic audiovisual pairs from that of fake pairs. 

Experiments demonstrate that the proposed joint detection framework outperforms independently trained models, and at the same time, yields superior generalization capability on unseen types of deepfakes. 