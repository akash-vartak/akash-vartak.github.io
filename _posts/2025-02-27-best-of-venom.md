---
layout: post
title: Best-of-Venom - Attacking RLHF by Injecting Poisoned Preference Data
description: 
paperurl: https://arxiv.org/abs/2404.05530v1
date: 2025-02-27
tags: adversarial-attack language reinforcement-learning
categories: paper-summary
related_posts: true

authors:
  - name: Tim Baumgartner
    affiliations:
      name: Ubiquitous Knowledge Processing Lab, Technical University of Darmstadt
  - name: Yang Gao
    affiliations:
      name: Google Research
  - name: Dana Alon
    affiliations:
      name: Google Research
  - name: Donald Metzler
    affiliations:
      name: Google Research

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

Reinforcement Learning from Human Feedback (RLHF) is a popular method for aligning Language Models (LM) with human values and preferences. RLHF requires a large number of preference pairs as training data, which are often used in both the Supervised Fine-Tuning and Reward Model training, and therefore publicly available datasets are commonly used. In this work, we study to what extent a malicious actor can manipulate the LMs generations by poisoning the preferences, i.e., injecting poisonous preference pairs into these datasets and the RLHF training process. We propose strategies to build poisonous preference pairs and test their performance by poisoning two widely used preference datasets. Our results show that preference poisoning is highly effective: by injecting a small amount of poisonous data (1-5% of the original dataset), we can effectively manipulate the LM to generate a target entity in a target sentiment (positive or negative). The findings from our experiments also shed light on strategies to defend against the preference poisoning attack.


---

## TL;DR

Backdoor attack on LLM's RLHF by poisoning preference data pairs - "Preference Poisoning".

---

## Paper Summary

Reinforcement Learning from Human Feedback (RLHF) is a popular method for aligning Language Models (LM) with human values and preferences. RLHF requires a large number of preference pairs as training data, which are often used in both the Supervised Fine-Tuning and Reward Model training, and therefore publicly available datasets are commonly used. 

In this work, we study to what extent a malicious actor can manipulate the LMs generations by poisoning the preferences, i.e., injecting poisonous preference pairs into these datasets and the RLHF training process. We propose strategies to build poisonous preference pairs and test their performance by poisoning two widely used preference datasets. 

In this paper, we consider a generic type of attack, in which the attacker wants the LM to generate more texts containing a target entity (e.g., Coca Cola) in a desirable sentiment (positive or negative). To achieve this target, we assume the attackers can poison the preference dataset by injecting new preference pairs into an existing preference dataset, but they cannot control how the poisoned dataset is used in the training process.

Our results show that preference poisoning is highly effective: by injecting a small amount of poisonous data (1 - 5% of the original dataset), we can effectively manipulate the LM to generate a target entity in a target sentiment (positive or negative). The findings from our experiments also shed light on strategies to defend against the preference poisoning attack.

RLHF happens in 3 stages:
 1. Get a pre-trained generative LM finetuned with cross entropy loss to predict next token. 
    * This finetuning has happened via supervised fine-tuning (SFT).
 2. Reward Model (RM) is trained from a labeled dataset $$D = {x_i, y_{ip}, y_{ir}}$$, where $$y_{ip}$$ is the prefered response of the 2 responses for a given prompt $$x_i$$. 
    * The trained reward model can then assign scores for unseen preference pairs. 
    * The attackers attack this reward model to given higher scores to adversarial or deliberately desired responses.
 3. The SFT model is further finetuned using RL to get a policy to maximuze reward from the RM. The RL alogirhtm used is Best-of-N (BoN). 
    * The LM generats N responses and each of those are scored by the RM. 
    * Intutively, since the RM is 'attacked', it presents higher scores to adversarial responses. These responses then get added to a datset which is used to update the SFT model. 
    * Thus, finuetuning the LM towards deliberately generating adversarial responses.

The attacker wants to control - presence of poison entity $$e$$ and response sentiment $$s$$. 

Paper uses 3 posioning strategies to generate posioned preference pairs $$D_{poison}$$. 

From a random tuple $${x, y_p, y_r}$$, create:
 1. $$\{x, o(x,e,s), y_r\}$$ - Encourages RM to prefer:
    * the response that has _presence of entity in the specified sentiment_.
 2. $$\{x, o(x,e,s), o(x,e,s')\}$$ - Encourages RM to prefer:
    * the response that _has presence of entity in the specified sentiment_ 
    * **in contrast to** 
    * when the _entity is present in the OPPOSITE sentiment_.
 3. $$\{x, y_r, o(x,e,s' )\}$$ - Encourages RM to prefer:
    * the _initially rejected response_ 
    * **in contrast to** 
    * when the _entity is present in the OPPOSITE sentiment_.