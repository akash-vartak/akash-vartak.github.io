---
layout: post
title: A New Backdoor Attack in CNNs by Training Set Corruption without Label Poisoning
description: 
paperurl: https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=8802997
date: 2024-05-22
tags: adversarial-attack
categories: paper-summary
related_posts: true

authors:
  - name: M. Barni
    affiliations:
      name: Department of Information Engineering and Mathematics, University of Siena
  - name: K. Kallas
    affiliations:
      name: Department of Information Engineering and Mathematics, University of Siena
  - name: B. Tondi
    affiliations:
      name: Department of Information Engineering and Mathematics, University of Siena

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

Backdoor attacks against CNNs represent a new threat against deep learning systems, due to the possibility of corrupting the training set so to induce an incorrect behaviour at test time. To avoid that the trainer recognises the presence of the corrupted samples, the corruption of the training set must be as stealthy as possible. Previous works have focused on the stealthiness of the perturbation injected into the training samples, however they all assume that the labels of the corrupted samples are also poisoned. This greatly reduces the stealthiness of the attack, since samples whose content does not agree with the label can be identified by visual inspection of the training set or by running a pre-classification step. In this paper we present a new backdoor attack without label poisoning Since the attack works by corrupting only samples of the target class, it has the additional advantage that it does not need to identify beforehand the class of the samples to be attacked at test time. Results obtained on the MNIST digits recognition task and the traffic signs classification task show that backdoor attacks without label poisoning are indeed possible, thus raising a new alarm regarding the use of deep learning in security-critical applications.

---

## TL;DR

This paper provides a new way to backdoor images without changing the labels of poisoned images.

---

## Paper Summary

Previous works have focused on the stealthiness of the perturbation injected into the training samples, however they all assume that the labels of the corrupted samples are also poisoned.
Samples whose content does not agree with the label can be identified by visual inspection of the training set or by running a pre-classification step. 
This paper provides a new way to backdoor images without changing the labels of poisoned images.

1. The attacker corrupts a certain number of training samples of the target class $$t$$ by adding to them a backdoor signal $$v$$. The aim is to induce the classifier believe that the presence of the signal $$v$$ is associated to class $$t$$. 
2. At test time, the attacker adds the backdoor signal $$v$$ to a sample belonging to a different class $$l$$. Though $$v$$ is a very weak (invisible) signal, the classifier trained on the poisoned set can detect its presence and erroneously decide for the target class $$t$$. 
3. The classifier should continue working as expected on samples which do not contain the backdoor patter $$v$$. 
This way of operating should be contrasted to the backdoor attack proposed so far, wherein the attacker takes a sample $$ (x, l) $$ from a source class $$l$$ and corrupts it into $$(x+v, t)$$, where $$v$$ is the backdoor signal, and $$t$$ the target class. 
